// Ítems de navegación. El label usa llaves del diccionario i18n (se traducen en runtime via
// `t(nav.home)`, etc.). Los `href` sin prefijo de locale — cada componente que consume esta
// lista añade `/en` cuando corresponde.

import type { StringKey } from '@/i18n/ui';

export interface NavItem {
	/** Llave del diccionario i18n para el label visible (solo strings). */
	labelKey: StringKey;
	/** Ruta relativa al locale (se prefijan con `/en` cuando aplica). */
	href: string;
}

// Orden alineado al de las secciones en el home (Hero → About → Experience → Projects →
// Skills → Education) + Contacto como ruta dedicada al final.
export const navItems: readonly NavItem[] = [
	{ labelKey: 'nav.home', href: '/#hero' },
	{ labelKey: 'nav.about', href: '/#about' },
	{ labelKey: 'nav.experience', href: '/#experience' },
	{ labelKey: 'nav.projects', href: '/#projects' },
	{ labelKey: 'nav.skills', href: '/#skills' },
	{ labelKey: 'nav.education', href: '/#education' },
	{ labelKey: 'nav.contact', href: '/contact' }
];
