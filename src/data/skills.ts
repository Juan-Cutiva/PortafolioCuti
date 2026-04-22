import type { Skill } from '@/types/portfolio';

// Stack real del CV. `category` permite agrupar en la UI. `url` apunta al sitio oficial y hace
// que cada tarjeta sea un enlace — útil si alguien quiere conocer la tecnología.
export const skills: readonly Skill[] = [
	// Frontend
	{
		name: 'React',
		icon: 'simple-icons:react',
		category: 'frontend',
		url: 'https://react.dev'
	},
	{
		name: 'Astro',
		icon: 'simple-icons:astro',
		category: 'frontend',
		url: 'https://astro.build'
	},
	{
		name: 'TailwindCSS',
		icon: 'simple-icons:tailwindcss',
		category: 'frontend',
		url: 'https://tailwindcss.com'
	},
	{
		name: 'JavaScript',
		icon: 'simple-icons:javascript',
		category: 'frontend',
		url: 'https://developer.mozilla.org/es/docs/Web/JavaScript'
	},

	// Base
	{
		name: 'HTML',
		icon: 'simple-icons:html5',
		category: 'base',
		url: 'https://developer.mozilla.org/es/docs/Web/HTML'
	},
	{
		name: 'CSS',
		icon: 'simple-icons:css3',
		category: 'base',
		url: 'https://developer.mozilla.org/es/docs/Web/CSS'
	},

	// Lenguajes
	{
		name: 'TypeScript',
		icon: 'simple-icons:typescript',
		category: 'language',
		url: 'https://www.typescriptlang.org'
	},

	// Herramientas
	{
		name: 'Git',
		icon: 'simple-icons:git',
		category: 'tooling',
		url: 'https://git-scm.com'
	},
	{
		name: 'GitHub',
		icon: 'simple-icons:github',
		category: 'tooling',
		url: 'https://github.com'
	},
	{
		name: 'Strapi',
		icon: 'simple-icons:strapi',
		category: 'tooling',
		url: 'https://strapi.io'
	},
	{
		name: 'WordPress',
		icon: 'simple-icons:wordpress',
		category: 'tooling',
		url: 'https://wordpress.org'
	}
];
