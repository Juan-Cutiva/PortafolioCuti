import type { ExperienceItem } from '@/types/portfolio';
import type { Locale } from '@/i18n/ui';

// Historial profesional por locale. Ordenado del más reciente al más antiguo dentro de cada
// locale. Si mañana vuelve a haber un solo idioma, basta con eliminar la clave `en`.

const experienceByLocale: Record<Locale, readonly ExperienceItem[]> = {
	es: [
		{
			role: 'Desarrollador Frontend',
			company: 'Centro Jurídico Internacional',
			period: 'Feb 2025 — Presente',
			location: 'Bogotá, Colombia',
			description:
				'Diseño y desarrollo de interfaces web para productos del grupo, con foco en performance, accesibilidad y experiencia de usuario.',
			highlights: [
				'Desarrollo de interfaces web modernas usando React, TypeScript y TailwindCSS.',
				'Optimización de estilos y velocidad usando TailwindCSS y Astro.',
				'Implementación de componentes reutilizables y diseño responsive.',
				'Integración de Strapi CMS para gestión de contenido en la página de noticias.'
			]
		}
	],
	en: [
		{
			role: 'Frontend Developer',
			company: 'Centro Jurídico Internacional',
			period: 'Feb 2025 — Present',
			location: 'Bogotá, Colombia',
			description:
				"Design and development of web interfaces for the group's products, focused on performance, accessibility and user experience.",
			highlights: [
				'Built modern web interfaces using React, TypeScript and TailwindCSS.',
				'Optimized styles and performance with TailwindCSS and Astro.',
				'Implemented reusable components and responsive design.',
				'Integrated Strapi CMS for content management on the news portal.'
			]
		}
	]
};

export function getExperience(locale: Locale): readonly ExperienceItem[] {
	return experienceByLocale[locale] ?? experienceByLocale.es;
}
