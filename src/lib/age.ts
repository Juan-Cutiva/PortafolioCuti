// Calcula la edad actual del usuario a partir de su fecha de nacimiento. Se ejecuta en build
// time (static) o request time (SSR), por lo que el valor siempre queda actualizado sin
// intervención manual.

/** Juan David Cutiva López — nacido el 9 de febrero de 2007. */
export const BIRTH_DATE = new Date('2007-02-09T00:00:00Z');

/**
 * Años completos entre `birthDate` y `today` (por defecto, ahora). Compensa si todavía no
 * ha llegado el cumpleaños de este año.
 */
export function calculateAge(birthDate: Date = BIRTH_DATE, today: Date = new Date()): number {
	let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
	const monthDiff = today.getUTCMonth() - birthDate.getUTCMonth();
	const dayDiff = today.getUTCDate() - birthDate.getUTCDate();
	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age -= 1;
	}
	return age;
}
