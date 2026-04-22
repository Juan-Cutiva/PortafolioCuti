import type { APIRoute } from 'astro';
import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';
import { getCollection } from 'astro:content';

// Endpoint SSR real (no prerender) — genera la imagen Open Graph bajo demanda por proyecto,
// por ítem de educación o por certificación. El adapter Vercel la sirve desde una lambda Node
// y el Cache-Control abajo permite que el CDN la guarde por un año (contenido inmutable por slug).
export const prerender = false;

// Cache en memoria para invocaciones "warm" de la misma función. Evita volver a descargar la
// fuente en cada hit. En Vercel cada instancia mantiene su propia copia.
let fontCache: ArrayBuffer | null = null;

async function getFont(): Promise<ArrayBuffer> {
	if (fontCache) return fontCache;
	const url =
		'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.8/files/inter-latin-700-normal.ttf';
	const res = await fetch(url);
	if (!res.ok) throw new Error(`No se pudo descargar la fuente OG (HTTP ${res.status})`);
	fontCache = await res.arrayBuffer();
	return fontCache;
}

interface OgContent {
	eyebrow: string;
	title: string;
	subtitle: string;
}

async function resolveContent(type: string | null, slug: string | null): Promise<OgContent> {
	if (type === 'project' && slug) {
		const entries = await getCollection('projects');
		const match = entries.find((e) => e.id === slug);
		if (match)
			return { eyebrow: 'Proyecto', title: match.data.title, subtitle: match.data.description };
	}
	if (type === 'education' && slug) {
		const entries = await getCollection('education');
		const match = entries.find((e) => e.id === slug);
		if (match)
			return {
				eyebrow: 'Formación',
				title: match.data.degree,
				subtitle: match.data.institution
			};
	}
	if (type === 'certification' && slug) {
		const entries = await getCollection('certifications');
		const match = entries.find((e) => e.id === slug);
		if (match)
			return {
				eyebrow: 'Certificación',
				title: match.data.name,
				subtitle: match.data.description ?? `Emitida por ${match.data.issuer}`
			};
	}
	return {
		eyebrow: 'Portafolio',
		title: 'Juan David Cutiva López',
		subtitle: 'Frontend Developer. React, Astro, TypeScript y TailwindCSS.'
	};
}

function truncate(text: string, max: number): string {
	return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

export const GET: APIRoute = async ({ url }) => {
	try {
		const type = url.searchParams.get('type');
		const slug = url.searchParams.get('slug');
		const { eyebrow, title, subtitle } = await resolveContent(type, slug);
		const safeTitle = truncate(title, 90);
		const safeSubtitle = truncate(subtitle, 160);
		const font = await getFont();

		const template = html`
			<div
				style="display:flex;flex-direction:column;justify-content:space-between;width:100%;height:100%;padding:72px 80px;background:#0b1220;color:#f1f5f9;font-family:Inter;position:relative;overflow:hidden;"
			>
				<div style="position:absolute;top:-180px;right:-140px;width:520px;height:520px;border-radius:9999px;background:#3846F5;opacity:0.22;filter:blur(40px);display:flex;"></div>
				<div style="position:absolute;bottom:-200px;left:-120px;width:480px;height:480px;border-radius:9999px;background:#ef4444;opacity:0.18;filter:blur(48px);display:flex;"></div>

				<div style="display:flex;flex-direction:column;">
					<p style="font-size:24px;color:#8b93ff;letter-spacing:6px;text-transform:uppercase;margin:0 0 32px 0;">${eyebrow}</p>
					<h1 style="font-size:76px;line-height:1.02;letter-spacing:-2px;margin:0;color:#f1f5f9;font-weight:700;max-width:1040px;">${safeTitle}</h1>
					<p style="font-size:28px;line-height:1.4;margin:32px 0 0 0;color:#94a3b8;font-weight:400;max-width:960px;">${safeSubtitle}</p>
				</div>

				<div style="display:flex;align-items:center;gap:20px;color:#f1f5f9;font-size:22px;">
					<div style="width:48px;height:48px;border-radius:12px;background:#3846F5;display:flex;align-items:center;justify-content:center;color:#ffffff;font-size:22px;font-weight:700;">JC</div>
					<div style="display:flex;flex-direction:column;">
						<span style="font-weight:700;font-size:22px;">Juan David Cutiva López</span>
						<span style="font-size:18px;color:#94a3b8;">Frontend Developer · Bogotá, CO</span>
					</div>
				</div>
			</div>
		`;

		const svg = await satori(template as Parameters<typeof satori>[0], {
			width: 1200,
			height: 630,
			fonts: [{ name: 'Inter', data: font, weight: 700, style: 'normal' }]
		});

		const png = await sharp(Buffer.from(svg)).png().toBuffer();

		return new Response(new Uint8Array(png), {
			status: 200,
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		});
	} catch (err) {
		console.error('[og] generación falló, devolviendo 302 a /og-image.png:', err);
		return new Response(null, {
			status: 302,
			headers: { Location: '/og-image.png' }
		});
	}
};
