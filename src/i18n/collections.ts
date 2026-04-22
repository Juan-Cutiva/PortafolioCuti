// Convención: español en la raíz de cada colección, inglés bajo `en/`. El `entry.id`
// refleja la ruta, así que filtramos y limpiamos el slug por prefijo.

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './ui';

type Collection = 'projects' | 'education' | 'certifications';

/** Slug sin el prefijo `en/`. */
export function cleanSlug<C extends Collection>(entry: CollectionEntry<C>): string {
	return entry.id.replace(/^en\//, '');
}

/** True si la entrada es del locale dado. */
export function entryMatchesLocale<C extends Collection>(
	entry: CollectionEntry<C>,
	locale: Locale
): boolean {
	const isEnglish = entry.id.startsWith('en/');
	return locale === 'en' ? isEnglish : !isEnglish;
}

/** getCollection filtrado por locale y ordenado por `data.order`. */
export async function getLocalizedCollection<C extends Collection>(
	name: C,
	locale: Locale
): Promise<CollectionEntry<C>[]> {
	const all = await getCollection(name);
	return all
		.filter((entry) => entryMatchesLocale(entry, locale))
		.sort((a, b) => {
			const orderA = (a.data as { order?: number }).order ?? 100;
			const orderB = (b.data as { order?: number }).order ?? 100;
			if (orderA !== orderB) return orderA - orderB;
			return cleanSlug(a).localeCompare(cleanSlug(b));
		});
}
