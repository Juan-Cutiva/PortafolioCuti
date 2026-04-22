// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import compress from 'astro-compress';
import vercel from '@astrojs/vercel';

// Setear PUBLIC_SITE_URL antes del deploy. Sitemap, canonicals y og:url dependen de esto.
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://tudominio.com';

// Render híbrido: `output: 'server'` para habilitar API routes (/api/og), pero cada página
// marca `prerender = true` para salir como HTML estático. El 99% del tráfico es estático.
export default defineConfig({
	site: SITE_URL,
	output: 'server',
	adapter: vercel({
		imageService: true
	}),
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: false
		}
	},
	prefetch: {
		prefetchAll: true,
		// `viewport` en vez de `hover` para no quemar datos en móvil.
		defaultStrategy: 'viewport'
	},
	build: {
		inlineStylesheets: 'auto'
	},
	integrations: [
		// i18n añade `xhtml:link alternate` por locale en cada URL. Omito `changefreq`
		// (Google lo ignora desde 2023).
		sitemap({
			i18n: {
				defaultLocale: 'es',
				locales: { es: 'es-CO', en: 'en' }
			},
			priority: 0.7,
			lastmod: new Date(),
			serialize(item) {
				// Home y /projects suben a 1.0 — son los puntos de entrada principales.
				if (item.url.endsWith('/') || item.url.endsWith('/projects/')) {
					item.priority = 1.0;
				}
				return item;
			}
		}),
		icon(),
		// Va último para trabajar sobre el output ya generado.
		compress({
			CSS: true,
			HTML: true,
			JavaScript: true,
			Image: false, // lo hace el adapter de Vercel
			SVG: true
		})
	],
	vite: {
		plugins: [tailwindcss()],
		build: {
			cssMinify: 'lightningcss'
		}
	}
});
