// Pre-renderiza la primera página de cada PDF en `public/certifications/` como PNG en
// `public/images/certifications/`. Ejecutarse antes del build y del dev:
//
//   npm run previews   # manual
//   npm run build      # auto (pre-hook)
//
// Ventaja: el sitio sirve PNGs estáticos (carga <100 ms) en vez de cargar pdf.js en cliente
// y parsear el PDF en cada visita (>10 s). Si el PNG ya existe y es más reciente que el PDF
// fuente, se salta la conversión — así las builds subsecuentes son rápidas.

import { createRequire } from 'node:module';
import { readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { createCanvas, DOMMatrix } from '@napi-rs/canvas';

// pdfjs-dist legacy build funciona en Node. El `createRequire` permite hacer require
// de archivos .mjs con interop CJS, que pdfjs necesita internamente.
const require = createRequire(import.meta.url);
const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

// pdf.js v4 espera DOMMatrix disponible en global al renderizar; el build legacy no
// polyfilla por sí solo.
if (!globalThis.DOMMatrix) {
	globalThis.DOMMatrix = DOMMatrix;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PDF_DIR = join(ROOT, 'public', 'certifications');
const OUT_DIR = join(ROOT, 'public', 'images', 'certifications');

// Fuentes estándar embebidas en pdfjs-dist. Sin esto, PDFs que referencian Helvetica/Times/Arial
// renderizan con glifos vacíos (cajitas ☐☐☐ en vez de texto). En Node no hay fontconfig, así
// que pdfjs debe saber dónde leer las fuentes base.
const STANDARD_FONTS_PATH =
	join(ROOT, 'node_modules', 'pdfjs-dist', 'standard_fonts') + '/';
const CMAPS_PATH = join(ROOT, 'node_modules', 'pdfjs-dist', 'cmaps') + '/';

/** Renderiza la primera página de `pdfPath` a `outPath` como PNG. */
async function renderPdfToPng(pdfPath, outPath) {
	const data = new Uint8Array(await (await import('node:fs')).promises.readFile(pdfPath));

	// Escala adaptada a un ancho objetivo de ~1700 px (cubre bien retina sin inflar el archivo).
	const loadingTask = pdfjs.getDocument({
		data,
		standardFontDataUrl: STANDARD_FONTS_PATH,
		cMapUrl: CMAPS_PATH,
		cMapPacked: true,
		// `false` fuerza a pdfjs a usar las fuentes estándar embebidas en vez de intentar
		// leer las del sistema (que en Node puede fallar silenciosamente).
		useSystemFonts: false,
		disableFontFace: false
	});
	const pdf = await loadingTask.promise;
	const page = await pdf.getPage(1);

	const baseViewport = page.getViewport({ scale: 1 });
	const targetWidth = 1700;
	const scale = targetWidth / baseViewport.width;
	const viewport = page.getViewport({ scale });

	const canvas = createCanvas(Math.floor(viewport.width), Math.floor(viewport.height));
	const ctx = canvas.getContext('2d');

	await page.render({
		canvasContext: ctx,
		viewport,
		// API v4+: parámetro opcional que evita warnings en algunas versiones.
		canvas
	}).promise;

	const buffer = await canvas.encode('png');
	await mkdir(dirname(outPath), { recursive: true });
	await writeFile(outPath, buffer);

	return { width: canvas.width, height: canvas.height };
}

/** Lista los PDFs que necesitan regenerar PNG (fuente más nueva que destino, o destino ausente). */
async function findPending() {
	if (!existsSync(PDF_DIR)) {
		console.log(`[pdf-previews] sin directorio ${PDF_DIR} — nada que hacer.`);
		return [];
	}
	const files = await readdir(PDF_DIR);
	const pdfs = files.filter((f) => extname(f).toLowerCase() === '.pdf');
	const pending = [];
	for (const pdf of pdfs) {
		const src = join(PDF_DIR, pdf);
		const out = join(OUT_DIR, `${basename(pdf, extname(pdf))}.png`);
		const srcStat = await stat(src);
		let outStat = null;
		try {
			outStat = await stat(out);
		} catch {
			// inexistente → regenerar
		}
		if (!outStat || srcStat.mtimeMs > outStat.mtimeMs) {
			pending.push({ src, out, name: pdf });
		}
	}
	return pending;
}

async function main() {
	const pending = await findPending();
	if (pending.length === 0) {
		console.log('[pdf-previews] todos los PNGs están al día ✓');
		return;
	}
	console.log(`[pdf-previews] generando ${pending.length} PNG(s)...`);
	for (const { src, out, name } of pending) {
		const start = Date.now();
		try {
			const { width, height } = await renderPdfToPng(src, out);
			const ms = Date.now() - start;
			console.log(`  ✓ ${name} → ${basename(out)} (${width}×${height}, ${ms}ms)`);
		} catch (err) {
			console.error(`  ✗ ${name}:`, err instanceof Error ? err.message : err);
			process.exitCode = 1;
		}
	}
}

await main();
