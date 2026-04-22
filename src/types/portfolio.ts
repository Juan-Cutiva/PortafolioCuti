// Tipos compartidos del portafolio. El contenido editorial (proyectos, educación,
// certificaciones) vive en `src/content/` como Content Collections — su schema lo define
// Zod en `src/content.config.ts` y Astro infiere los tipos automáticamente. Aquí solo quedan
// los tipos que consumen componentes y los datos TS (`src/data/*.ts`).

/** Imagen con alt y dimensiones opcionales. `width` y `height` reservan layout y evitan CLS. */
export interface Image {
	/** Ruta relativa a /public o import desde un asset. */
	src: string;
	/** Texto alternativo accesible — siempre descriptivo. */
	alt: string;
	/** Ancho intrínseco en píxeles. Usarlo como atributo `width`. */
	width?: number;
	/** Alto intrínseco en píxeles. Usarlo como atributo `height`. */
	height?: number;
}

/** Meta visible en la página del case study (dl con hasta 4 entradas). */
export interface CaseStudyMeta {
	role?: string;
	client?: string;
	year?: string;
	type?: string;
	location?: string;
	/** Duración formateada (p. ej. "3984 horas", "2 meses"). */
	duration?: string;
	/** Institución / emisor / cliente — útil para certificaciones. */
	issuer?: string;
}

export interface ExperienceItem {
	role: string;
	company: string;
	period: string;
	location?: string;
	description: string;
	highlights?: readonly string[];
}

export interface Skill {
	name: string;
	icon: string;
	category?: 'frontend' | 'base' | 'tooling' | 'language';
	url?: string;
}
