// Gestión del tema (dark/light). Política:
//   - Si el usuario eligió antes: usar lo guardado en localStorage.
//   - Si no ha elegido: forzar 'dark' (decisión del proyecto, no se respeta prefers-color-scheme).
//   - Cuando el usuario cambie el tema, se persiste en localStorage y se reconcilia con View Transitions.

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'dark';

function isTheme(value: unknown): value is Theme {
	return value === 'light' || value === 'dark';
}

/**
 * Lee el tema persistido. Si no hay, devuelve el valor por defecto del proyecto.
 * Seguro en SSR: si no hay `localStorage`, retorna el default.
 */
export function getStoredTheme(): Theme {
	if (typeof window === 'undefined') return DEFAULT_THEME;
	const saved = window.localStorage.getItem(STORAGE_KEY);
	return isTheme(saved) ? saved : DEFAULT_THEME;
}

/** Aplica el tema al <html> y actualiza atributos auxiliares para que CSS y ARIA reaccionen. */
export function applyTheme(theme: Theme): void {
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	root.classList.toggle('dark', theme === 'dark');
	root.dataset.theme = theme;
}

/** Persiste y aplica. Emite un CustomEvent para que el toggle sincronice su UI. */
export function setTheme(theme: Theme): void {
	if (typeof window === 'undefined') return;
	window.localStorage.setItem(STORAGE_KEY, theme);
	applyTheme(theme);
	window.dispatchEvent(new CustomEvent<Theme>('themechange', { detail: theme }));
}

/** Alterna entre light y dark a partir del estado actual del DOM. */
export function toggleTheme(): Theme {
	const next: Theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
	setTheme(next);
	return next;
}

interface BeforeSwapEvent extends Event {
	readonly newDocument: Document;
}

/**
 * Mantiene el tema sincronizado en cada navegación con View Transitions. Trabaja en dos
 * fases para evitar flicker:
 *   1. `before-swap`: el nuevo <html> ya existe pero no se ha pintado. Aplicamos `.dark` ahí
 *      para que los iconos (sun/moon con `.dark:block` / `.dark:hidden`) no parpadeen.
 *   2. `after-swap`: re-aplica por si el persist descartó el primer paso en algún navegador.
 */
export function bindThemeAcrossNavigations(): void {
	if (typeof document === 'undefined') return;
	document.addEventListener('astro:before-swap', (event) => {
		const newDoc = (event as BeforeSwapEvent).newDocument;
		if (!newDoc) return;
		const theme = getStoredTheme();
		newDoc.documentElement.classList.toggle('dark', theme === 'dark');
		newDoc.documentElement.dataset.theme = theme;
	});
	document.addEventListener('astro:after-swap', () => applyTheme(getStoredTheme()));
}
