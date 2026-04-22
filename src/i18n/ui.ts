// Diccionarios de UI para el portafolio. `es` es la fuente de verdad (todo el sitio nació en
// español). `en` mantiene las mismas llaves traducidas. Cualquier llave que falte en `en` se
// marca como error en build time porque ambos cumplen el mismo tipo `UITranslations`.

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

// Metadata por locale (se usa en `<html lang>`, `og:locale`, selector de idioma).
export const localeMeta: Record<
	Locale,
	{ label: string; flag: string; htmlLang: string; ogLocale: string }
> = {
	es: { label: 'Español', flag: 'flag:co-4x3', htmlLang: 'es', ogLocale: 'es_CO' },
	en: { label: 'English', flag: 'flag:us-4x3', htmlLang: 'en', ogLocale: 'en_US' }
};

/** Palabra del titular del Hero. Si `tone` está presente, colorea la palabra. `glue` evita
 *  el espacio previo para puntuación pegada (p. ej. coma después de una palabra). */
export interface HeroWord {
	text: string;
	tone?: 'primary' | 'accent';
	glue?: boolean;
}

export type HeroWordOrString = string | HeroWord;

export interface UITranslations {
	// Navegación
	'nav.home': string;
	'nav.projects': string;
	'nav.about': string;
	'nav.experience': string;
	'nav.skills': string;
	'nav.education': string;
	'nav.contact': string;
	'nav.primary': string;
	'nav.secondary': string;
	'nav.backToHome': string;

	// Mobile drawer
	'drawer.label': string;
	'drawer.open': string;
	'drawer.close': string;
	'drawer.heading': string;

	// Theme
	'theme.dark': string;
	'theme.light': string;
	'theme.label': string;

	// Language
	'language.label': string;
	'language.currentLabel': string;

	// Hero
	'hero.eyebrow': string;
	'hero.titleWords': HeroWordOrString[];
	'hero.titleAria': string;
	'hero.lede': string;
	'hero.ctaProjects': string;
	'hero.ctaContact': string;
	'hero.ctaCv': string;
	'hero.scroll': string;
	'hero.avatarAlt': string;
	'hero.avatarLink': string;

	// About
	'about.eyebrow': string;
	'about.title': string;
	'about.p1': string;
	'about.p2': string;
	'about.p3': string;
	'about.softSkills': string;
	'about.softSkillsList': string[];
	'about.interests': string;
	'about.interestsList': string[];
	'about.languages': string;
	'about.spanish': string;
	'about.english': string;
	'about.spanishLevel': string;
	'about.englishLevel': string;

	// Experience
	'experience.eyebrow': string;
	'experience.title': string;

	// Projects
	'projects.eyebrow': string;
	'projects.title': string;
	'projects.description': string;
	'projects.seeAll': string;
	'projects.featured': string;
	'projects.tech': string;
	'projects.liveSite': string;
	'projects.caseStudy': string;
	'projects.code': string;
	'projects.srCaseStudy': string;
	'projects.srRepo': string;
	'projects.allTitle': string;
	'projects.allDescription': string;

	// Skills
	'skills.eyebrow': string;
	'skills.title': string;
	'skills.groups.frontend': string;
	'skills.groups.base': string;
	'skills.groups.language': string;
	'skills.groups.tooling': string;
	'skills.officialSiteOf': string;

	// Education
	'education.eyebrow': string;
	'education.title': string;
	'education.description': string;
	'education.educationHeading': string;
	'education.certsHeading': string;
	'education.seeCase': string;

	// Contact
	'contact.eyebrow': string;
	'contact.title': string;
	'contact.description': string;
	'contact.email': string;
	'contact.copyPrefix': string;
	'contact.copyLabel': string;
	'contact.copied': string;
	'contact.copyFail': string;
	'contact.pageTitle': string;
	'contact.pageDescription': string;

	// Case study
	'caseStudy.project': string;
	'caseStudy.education': string;
	'caseStudy.certification': string;
	'caseStudy.backProjects': string;
	'caseStudy.backEducation': string;
	'caseStudy.liveSite': string;
	'caseStudy.viewCode': string;
	'caseStudy.visitInstitution': string;
	'caseStudy.viewCertificate': string;
	'caseStudy.viewCertificateOfficial': string;
	'caseStudy.backToProjects': string;
	'caseStudy.backToEducation': string;
	'caseStudy.contactCta': string;
	'caseStudy.contactMe': string;
	'caseStudy.metaRole': string;
	'caseStudy.metaClient': string;
	'caseStudy.metaIssuer': string;
	'caseStudy.metaLocation': string;
	'caseStudy.metaDuration': string;
	'caseStudy.metaYear': string;
	'caseStudy.metaType': string;
	'caseStudy.pdfOfficial': string;
	'caseStudy.viewPdf': string;
	'caseStudy.emittedBy': string;

	// Footer
	'footer.tagline': string;
	'footer.cta': string;
	'footer.col.explore': string;
	'footer.col.work': string;
	'footer.link.projects': string;
	'footer.link.about': string;
	'footer.link.experience': string;
	'footer.link.education': string;
	'footer.link.contact': string;
	'footer.link.cv': string;
	'footer.link.allProjects': string;
	'footer.madeWith': string;
	'footer.socialLabel': string;

	// 404
	'404.title': string;
	'404.description': string;
	'404.eyebrow': string;
	'404.heading': string;
	'404.copy': string;
	'404.backHome': string;
	'404.suggestions': string;

	// Skip link
	'a11y.skipLink': string;
}

const es: UITranslations = {
	'nav.home': 'Inicio',
	'nav.projects': 'Proyectos',
	'nav.about': 'Sobre mí',
	'nav.experience': 'Experiencia',
	'nav.skills': 'Habilidades',
	'nav.education': 'Formación',
	'nav.contact': 'Contacto',
	'nav.primary': 'Principal',
	'nav.secondary': 'Navegación secundaria',
	'nav.backToHome': 'Inicio — Juan Cutiva',

	'drawer.label': 'Menú de navegación',
	'drawer.open': 'Abrir menú de navegación',
	'drawer.close': 'Cerrar menú de navegación',
	'drawer.heading': 'Navegación',

	'theme.dark': 'Activar modo claro',
	'theme.light': 'Activar modo oscuro',
	'theme.label': 'Cambiar tema',

	'language.label': 'Cambiar idioma',
	'language.currentLabel': 'Idioma actual',

	'hero.eyebrow': 'Frontend Developer · Bogotá, CO',
	'hero.titleWords': [
		'Construyo',
		'interfaces',
		'web',
		{ text: 'rápidas', tone: 'primary' },
		{ text: ',', glue: true },
		{ text: 'accesibles', tone: 'accent' },
		'y',
		'con',
		'el',
		'detalle',
		'bien',
		'cuidado.'
	],
	'hero.titleAria': 'Construyo interfaces web rápidas, accesibles y con el detalle bien cuidado.',
	'hero.lede':
		'Desarrollador frontend autodidacta, apasionado por el crecimiento y la mejor forma de resolver cada problema. Mi stack diario: React, Astro, TypeScript y TailwindCSS.',
	'hero.ctaProjects': 'Ver proyectos',
	'hero.ctaContact': 'Contáctame',
	'hero.ctaCv': 'Descargar CV',
	'hero.scroll': 'Desliza',
	'hero.avatarAlt': 'Juan David Cutiva López',
	'hero.avatarLink': 'Conoce mi lado más personal',

	'about.eyebrow': 'Sobre mí',
	'about.title': 'Autodidacta, curioso, apasionado al detalle.',
	'about.p1':
		'Soy **Juan David Cutiva López**, tengo {age} años. Aprendí programación de forma autodidacta y actualmente me encuentro en formación. Me enfoco en entender a fondo los problemas para construir soluciones bien pensadas, no solo rápidas.',
	'about.p2':
		'Trabajo como desarrollador frontend con React, Astro, TypeScript y TailwindCSS. Me centro en los detalles que marcan la diferencia: tipografía, espaciado, accesibilidad, rendimiento y SEO. Creo que la calidad de un producto digital se percibe en cómo se siente al usarlo.',
	'about.p3':
		'Actualmente curso el **Tecnólogo - Análisis y Desarrollo de Software** en el SENA (2025 - 2027) y complemento mi formación con cursos en Platzi (Astro, TailwindCSS, Git & GitHub, HTML & CSS). Mantengo un aprendizaje constante y orientado a mejorar cada día.',
	'about.softSkills': 'Soft skills',
	'about.softSkillsList': [
		'Análisis y resolución de problemas',
		'Trabajo en equipo y adaptabilidad',
		'Atención al detalle y organización',
		'Aprendizaje rápido y constante'
	],
	'about.interests': 'Intereses',
	'about.interestsList': ['UI/UX', 'Performance web', 'SEO', 'Accesibilidad', 'Responsive'],
	'about.languages': 'Idiomas',
	'about.spanish': 'Español',
	'about.english': 'Inglés',
	'about.spanishLevel': 'Nativo',
	'about.englishLevel': 'A2 · en progreso',

	'experience.eyebrow': 'Experiencia',
	'experience.title': 'Dónde he trabajado.',

	'projects.eyebrow': 'Proyectos',
	'projects.title': 'Trabajo seleccionado',
	'projects.description':
		'Proyectos reales en producción. Cada caso cuenta con decisiones técnicas concretas, enlace vivo y stack documentado.',
	'projects.seeAll': 'Ver todos los proyectos',
	'projects.featured': 'Destacado',
	'projects.tech': 'Tecnologías',
	'projects.liveSite': 'Ver sitio',
	'projects.caseStudy': 'Caso de estudio',
	'projects.code': 'Código',
	'projects.srCaseStudy': ' — ver caso de estudio',
	'projects.srRepo': 'Repositorio de {title}',
	'projects.allTitle': 'Todos los proyectos.',
	'projects.allDescription':
		'Listado completo del portafolio — {count} proyectos en producción, cada uno con su caso de estudio, stack documentado y enlace vivo cuando aplica.',

	'skills.eyebrow': 'Habilidades',
	'skills.title': 'Stack con el que trabajo.',
	'skills.groups.frontend': 'Frontend',
	'skills.groups.base': 'Base',
	'skills.groups.language': 'Lenguajes',
	'skills.groups.tooling': 'Herramientas',
	'skills.officialSiteOf': 'Sitio oficial de {name}',

	'education.eyebrow': 'Formación',
	'education.title': 'Educación y certificaciones.',
	'education.description':
		'Toca cada ítem para abrir el caso de estudio con detalles sobre la institución, el programa y lo que me llevo.',
	'education.educationHeading': 'Educación',
	'education.certsHeading': 'Certificaciones',
	'education.seeCase': 'Ver caso de estudio',

	'contact.eyebrow': 'Contacto',
	'contact.title': 'Hablemos.',
	'contact.description':
		'¿Tienes una idea, oportunidad o feedback? Prefiero correo, pero elige el canal que te quede bien.',
	'contact.email': 'Correo',
	'contact.copyPrefix': 'o copia directo:',
	'contact.copyLabel': 'Copiar {email} al portapapeles',
	'contact.copied': 'Correo copiado al portapapeles',
	'contact.copyFail': 'No se pudo copiar. Selecciona y copia manualmente.',
	'contact.pageTitle': 'Contacto — Juan David Cutiva López',
	'contact.pageDescription':
		'Envía un mensaje a Juan David Cutiva López para oportunidades, colaboraciones o proyectos frontend.',

	'caseStudy.project': 'Caso de estudio',
	'caseStudy.education': 'Educación',
	'caseStudy.certification': 'Certificación',
	'caseStudy.backProjects': 'Proyectos',
	'caseStudy.backEducation': 'Formación',
	'caseStudy.liveSite': 'Ver sitio en vivo',
	'caseStudy.viewCode': 'Ver código',
	'caseStudy.visitInstitution': 'Visitar institución',
	'caseStudy.viewCertificate': 'Ver certificado',
	'caseStudy.viewCertificateOfficial': 'Ver certificado oficial',
	'caseStudy.backToProjects': 'Volver a proyectos',
	'caseStudy.backToEducation': 'Volver a formación',
	'caseStudy.contactCta': 'Hablemos de un proyecto',
	'caseStudy.contactMe': 'Contáctame',
	'caseStudy.metaRole': 'Rol',
	'caseStudy.metaClient': 'Cliente',
	'caseStudy.metaIssuer': 'Emisor',
	'caseStudy.metaLocation': 'Ubicación',
	'caseStudy.metaDuration': 'Duración',
	'caseStudy.metaYear': 'Año',
	'caseStudy.metaType': 'Tipo',
	'caseStudy.pdfOfficial': 'Documento oficial disponible en PDF',
	'caseStudy.viewPdf': 'Ver PDF',
	'caseStudy.emittedBy': 'Certificado emitido por {issuer}',

	'footer.tagline':
		'Desarrollador Frontend en Bogotá. Construyo interfaces web que cargan rápido, se sienten fluidas y cuidan el detalle.',
	'footer.cta': 'Hablemos de tu próximo proyecto',
	'footer.col.explore': 'Explora',
	'footer.col.work': 'Trabajo',
	'footer.link.projects': 'Proyectos',
	'footer.link.about': 'Sobre mí',
	'footer.link.experience': 'Experiencia',
	'footer.link.education': 'Formación',
	'footer.link.contact': 'Contacto',
	'footer.link.cv': 'Descargar CV',
	'footer.link.allProjects': 'Todos los proyectos',
	'footer.madeWith': 'Hecho con',
	'footer.socialLabel': 'Perfiles y contacto',

	'404.title': 'Página no encontrada — Juan Cutiva',
	'404.description': 'La página que buscas no existe o fue movida.',
	'404.eyebrow': 'Error 404',
	'404.heading': 'Página no encontrada',
	'404.copy':
		'La ruta que abriste no existe o cambió de lugar. Puedes volver al inicio o explorar alguno de mis proyectos destacados.',
	'404.backHome': 'Volver al inicio',
	'404.suggestions': 'Quizás te interese',

	'a11y.skipLink': 'Saltar al contenido'
};

const en: UITranslations = {
	'nav.home': 'Home',
	'nav.projects': 'Projects',
	'nav.about': 'About',
	'nav.experience': 'Experience',
	'nav.skills': 'Skills',
	'nav.education': 'Education',
	'nav.contact': 'Contact',
	'nav.primary': 'Primary',
	'nav.secondary': 'Secondary navigation',
	'nav.backToHome': 'Home — Juan Cutiva',

	'drawer.label': 'Navigation menu',
	'drawer.open': 'Open navigation menu',
	'drawer.close': 'Close navigation menu',
	'drawer.heading': 'Navigation',

	'theme.dark': 'Switch to light mode',
	'theme.light': 'Switch to dark mode',
	'theme.label': 'Switch theme',

	'language.label': 'Change language',
	'language.currentLabel': 'Current language',

	'hero.eyebrow': 'Frontend Developer · Bogotá, CO',
	'hero.titleWords': [
		'I',
		'build',
		{ text: 'fast', tone: 'primary' },
		{ text: ',', glue: true },
		{ text: 'accessible', tone: 'accent' },
		'web',
		'interfaces',
		'with',
		'the',
		'details',
		'well',
		'cared',
		'for.'
	],
	'hero.titleAria': 'I build fast, accessible web interfaces with the details well cared for.',
	'hero.lede':
		'Self-taught frontend developer, passionate about growth and finding the best way to solve each problem. Daily stack: React, Astro, TypeScript and TailwindCSS.',
	'hero.ctaProjects': 'See projects',
	'hero.ctaContact': 'Contact me',
	'hero.ctaCv': 'Download CV',
	'hero.scroll': 'Scroll',
	'hero.avatarAlt': 'Juan David Cutiva López',
	'hero.avatarLink': 'Get to know my more personal side',

	'about.eyebrow': 'About me',
	'about.title': 'Self-taught, curious, obsessed with the details.',
	'about.p1':
		"I'm **Juan David Cutiva López**, {age} years old. I learned programming on my own and I'm currently continuing my formal studies. I focus on deeply understanding problems so I can ship well thought-out solutions, not just fast ones.",
	'about.p2':
		'I work as a frontend developer with React, Astro, TypeScript and TailwindCSS. I care about the details that make a difference: typography, spacing, accessibility, performance and SEO. I believe the quality of a digital product shows in how it feels to use it.',
	'about.p3':
		"I'm currently studying **Software Analysis and Development Technology** at SENA (2025 – 2027) and complementing my learning with Platzi courses (Astro, TailwindCSS, Git & GitHub, HTML & CSS). Constant learning, always aimed at getting better.",
	'about.softSkills': 'Soft skills',
	'about.softSkillsList': [
		'Problem analysis and resolution',
		'Teamwork and adaptability',
		'Attention to detail and organization',
		'Fast and constant learning'
	],
	'about.interests': 'Interests',
	'about.interestsList': ['UI/UX', 'Web performance', 'SEO', 'Accessibility', 'Responsive'],
	'about.languages': 'Languages',
	'about.spanish': 'Spanish',
	'about.english': 'English',
	'about.spanishLevel': 'Native',
	'about.englishLevel': 'A2 · in progress',

	'experience.eyebrow': 'Experience',
	'experience.title': 'Where I have worked.',

	'projects.eyebrow': 'Projects',
	'projects.title': 'Selected work',
	'projects.description':
		'Real projects in production. Each one tells concrete technical decisions, a live link and a documented stack.',
	'projects.seeAll': 'See all projects',
	'projects.featured': 'Featured',
	'projects.tech': 'Technologies',
	'projects.liveSite': 'Visit site',
	'projects.caseStudy': 'Case study',
	'projects.code': 'Code',
	'projects.srCaseStudy': ' — view case study',
	'projects.srRepo': '{title} repository',
	'projects.allTitle': 'All projects.',
	'projects.allDescription':
		'Full portfolio list — {count} projects in production, each with its case study, documented stack and live link where applicable.',

	'skills.eyebrow': 'Skills',
	'skills.title': 'Stack I work with.',
	'skills.groups.frontend': 'Frontend',
	'skills.groups.base': 'Base',
	'skills.groups.language': 'Languages',
	'skills.groups.tooling': 'Tools',
	'skills.officialSiteOf': 'Official site of {name}',

	'education.eyebrow': 'Education',
	'education.title': 'Studies and certifications.',
	'education.description':
		'Tap each item to open the case study with details about the institution, the program and what I took away.',
	'education.educationHeading': 'Education',
	'education.certsHeading': 'Certifications',
	'education.seeCase': 'See case study',

	'contact.eyebrow': 'Contact',
	'contact.title': "Let's talk.",
	'contact.description':
		'Got an idea, an opportunity, or feedback? I prefer email, but pick the channel that works for you.',
	'contact.email': 'Email',
	'contact.copyPrefix': 'or copy directly:',
	'contact.copyLabel': 'Copy {email} to clipboard',
	'contact.copied': 'Email copied to clipboard',
	'contact.copyFail': "Couldn't copy. Please select and copy manually.",
	'contact.pageTitle': 'Contact — Juan David Cutiva López',
	'contact.pageDescription':
		'Send Juan David Cutiva López a message for opportunities, collaborations, or frontend projects.',

	'caseStudy.project': 'Case study',
	'caseStudy.education': 'Education',
	'caseStudy.certification': 'Certification',
	'caseStudy.backProjects': 'Projects',
	'caseStudy.backEducation': 'Education',
	'caseStudy.liveSite': 'Visit live site',
	'caseStudy.viewCode': 'View code',
	'caseStudy.visitInstitution': 'Visit institution',
	'caseStudy.viewCertificate': 'View certificate',
	'caseStudy.viewCertificateOfficial': 'View official certificate',
	'caseStudy.backToProjects': 'Back to projects',
	'caseStudy.backToEducation': 'Back to education',
	'caseStudy.contactCta': "Let's talk about a project",
	'caseStudy.contactMe': 'Contact me',
	'caseStudy.metaRole': 'Role',
	'caseStudy.metaClient': 'Client',
	'caseStudy.metaIssuer': 'Issuer',
	'caseStudy.metaLocation': 'Location',
	'caseStudy.metaDuration': 'Duration',
	'caseStudy.metaYear': 'Year',
	'caseStudy.metaType': 'Type',
	'caseStudy.pdfOfficial': 'Official document available as PDF',
	'caseStudy.viewPdf': 'View PDF',
	'caseStudy.emittedBy': 'Certificate issued by {issuer}',

	'footer.tagline':
		'Frontend developer based in Bogotá. I build web interfaces that load fast, feel smooth and get the details right.',
	'footer.cta': "Let's talk about your next project",
	'footer.col.explore': 'Explore',
	'footer.col.work': 'Work',
	'footer.link.projects': 'Projects',
	'footer.link.about': 'About',
	'footer.link.experience': 'Experience',
	'footer.link.education': 'Education',
	'footer.link.contact': 'Contact',
	'footer.link.cv': 'Download CV',
	'footer.link.allProjects': 'All projects',
	'footer.madeWith': 'Built with',
	'footer.socialLabel': 'Profiles and contact',

	'404.title': 'Page not found — Juan Cutiva',
	'404.description': "The page you're looking for doesn't exist or was moved.",
	'404.eyebrow': 'Error 404',
	'404.heading': 'Page not found',
	'404.copy':
		"The route you opened doesn't exist or has moved. You can go back home or explore some of my featured projects.",
	'404.backHome': 'Back to home',
	'404.suggestions': 'You might like',

	'a11y.skipLink': 'Skip to content'
};

const dictionaries: Record<Locale, UITranslations> = { es, en };

/** Llaves del diccionario cuyo valor es un string (aptas para `t()`). `& string` narrow-ea
 *  la firma para que TS no la ensanche a `string | number | symbol`. */
export type StringKey = {
	[K in keyof UITranslations]: UITranslations[K] extends string ? K : never;
}[keyof UITranslations] &
	string;

/** Llaves del diccionario cuyo valor es un array de strings (aptas para `tList()`). */
export type ListKey = {
	[K in keyof UITranslations]: UITranslations[K] extends readonly string[] ? K : never;
}[keyof UITranslations] &
	string;

/**
 * Devuelve las funciones de traducción para un locale. `t(key, vars?)` para strings (con
 * interpolación `{name}`). `tList(key)` para arrays de strings. `tWords()` para las palabras
 * del Hero con su metadata (tone/glue).
 */
export function useTranslations(locale: Locale) {
	const dict = dictionaries[locale] ?? dictionaries[defaultLocale];

	function t(key: StringKey, vars?: Record<string, string | number>): string {
		const value = dict[key] as string;
		if (!vars) return value;
		return value.replace(/\{(\w+)\}/g, (match, name) =>
			name in vars ? String(vars[name]) : match
		);
	}

	function tList(key: ListKey): readonly string[] {
		return dict[key] as readonly string[];
	}

	function tWords(): HeroWordOrString[] {
		return dict['hero.titleWords'];
	}

	return { t, tList, tWords, locale };
}

/**
 * Detecta el locale actual desde el pathname. `/en/...` → `en`; cualquier otra cosa → `es`.
 */
export function getLocaleFromUrl(url: URL): Locale {
	const first = url.pathname.split('/').filter(Boolean)[0];
	return first === 'en' ? 'en' : 'es';
}

/**
 * Construye la URL equivalente en el otro locale preservando el resto del pathname.
 * `/projects/foo` → `/en/projects/foo` y viceversa.
 */
export function getLocaleUrl(pathname: string, locale: Locale): string {
	const stripped = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
	if (locale === defaultLocale) return stripped;
	return `/en${stripped === '/' ? '' : stripped}`;
}
