import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

// Content Collections (Content Layer API). Para agregar una entrada basta con crear
// `src/content/<coleccion>/mi-slug.md` con frontmatter válido — la ruta se genera sola.

/** Preview usada en cards y como imagen destacada de cada case study. */
const imageSchema = z.object({
	src: z.string(),
	alt: z.string(),
	width: z.number().optional(),
	height: z.number().optional()
});

/** Grid de meta-datos en los case studies (hasta 4 columnas). */
const metaSchema = z
	.object({
		role: z.string().optional(),
		client: z.string().optional(),
		year: z.string().optional(),
		type: z.string().optional(),
		location: z.string().optional(),
		duration: z.string().optional(),
		issuer: z.string().optional()
	})
	.optional();

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		stack: z.array(z.string()),
		url: z.string().url().optional(),
		repoUrl: z.string().url().optional(),
		image: imageSchema.optional(),
		featured: z.boolean().default(false),
		order: z.number().default(100),
		meta: metaSchema
	})
});

const education = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
	schema: z.object({
		institution: z.string(),
		degree: z.string(),
		period: z.string().optional(),
		description: z.string().optional(),
		url: z.string().url().optional(),
		image: imageSchema.optional(),
		order: z.number().default(100),
		meta: metaSchema
	})
});

const certifications = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/certifications' }),
	schema: z.object({
		name: z.string(),
		issuer: z.string(),
		url: z.string().url().optional(),
		icon: z.string().optional(),
		description: z.string().optional(),
		image: imageSchema.optional(),
		pdf: z.string().optional(),
		order: z.number().default(100),
		meta: metaSchema
	})
});

// Páginas largas sobre el autor (lado humano, no profesional). La estructura completa
// vive en frontmatter; el cuerpo markdown queda para prosa más libre.
const personal = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/personal' }),
	schema: z.object({
		pageTitle: z.string(),
		pageDescription: z.string(),
		eyebrow: z.string(),
		title: z.string(),
		/** Permite el token `{age}` que se reemplaza en runtime por la edad calculada. */
		lede: z.string(),
		photos: z.array(
			z.object({
				src: z.string(),
				alt: z.string(),
				label: z.string(),
				caption: z.string(),
				/** Ocupa 2 filas en desktop — el retrato principal. */
				tall: z.boolean().optional()
			})
		),
		whoAmI: z.object({
			heading: z.string()
		}),
		motivations: z.object({
			heading: z.string(),
			items: z.array(
				z.object({
					icon: z.string(),
					title: z.string(),
					body: z.string()
				})
			)
		}),
		freetime: z.object({
			heading: z.string(),
			items: z.array(
				z.object({
					eyebrow: z.string(),
					body: z.string(),
					// Embed de Spotify. `id` es el último segmento de la URL.
					embed: z
						.object({
							type: z.enum(['spotify-artist', 'spotify-album', 'spotify-track', 'spotify-playlist']),
							id: z.string()
						})
						.optional(),
					// Foto del hobby si no hay embed.
					image: z
						.object({
							src: z.string(),
							alt: z.string()
						})
						.optional()
				})
			)
		}),
		quote: z.object({
			text: z.string(),
			author: z.string()
		}),
		cta: z.object({
			eyebrow: z.string(),
			body: z.string(),
			buttonLabel: z.string(),
			buttonHref: z.string()
		}),
		breadcrumb: z.object({
			backLabel: z.string(),
			navLabel: z.string()
		})
	})
});

export const collections = { projects, education, certifications, personal };
