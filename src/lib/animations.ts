// Helper central de animaciones de entrada. Se invoca desde Layout.astro en cada
// `astro:page-load` para convivir con View Transitions. Si la ruta no tiene elementos con
// `data-reveal` ni `data-reveal-stagger`, el módulo `motion` NI SIQUIERA se carga
// (dynamic import) — así el bundle de /contact, /404 y rutas sin animaciones no paga los
// ~38 KB gz de motion.

const REVEAL_SELECTOR = '[data-reveal]';
const STAGGER_SELECTOR = '[data-reveal-stagger]';

function prefersReducedMotion(): boolean {
	return (
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

/** Fuerza estado final en elementos marcados para evitar FOUC sin animación. */
function forceVisibleWithoutAnimation() {
	document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
		el.style.opacity = '1';
		el.style.transform = 'none';
	});
	document.querySelectorAll<HTMLElement>(STAGGER_SELECTOR).forEach((container) => {
		Array.from(container.children).forEach((child) => {
			(child as HTMLElement).style.opacity = '1';
			(child as HTMLElement).style.transform = 'none';
		});
	});
}

/**
 * Activa las animaciones de entrada en todos los elementos marcados. Si no hay candidatos o el
 * usuario prefiere reduced motion, termina sin importar motion.
 */
export async function setupSectionReveal(): Promise<void> {
	if (typeof document === 'undefined') return;

	const hasReveal = document.querySelector(REVEAL_SELECTOR);
	const hasStagger = document.querySelector(STAGGER_SELECTOR);
	if (!hasReveal && !hasStagger) return; // Ruta sin animaciones → ni siquiera carga motion.

	if (prefersReducedMotion()) {
		forceVisibleWithoutAnimation();
		return;
	}

	// Import dinámico: motion solo entra al bundle de la ruta que realmente anima algo.
	const { animate, inView, stagger } = await import('motion');

	function reveal(element: HTMLElement) {
		if (element.dataset.revealed === 'true') return;
		element.dataset.revealed = 'true';
		animate(
			element,
			{ opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] },
			{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }
		);
	}

	function revealStagger(container: HTMLElement) {
		if (container.dataset.revealed === 'true') return;
		container.dataset.revealed = 'true';
		const children = Array.from(container.children) as HTMLElement[];
		if (children.length === 0) return;
		animate(
			children,
			{ opacity: [0, 1], transform: ['translateY(16px)', 'translateY(0)'] },
			{ duration: 0.5, ease: 'easeOut', delay: stagger(0.08) }
		);
	}

	document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
		inView(el, () => reveal(el), { amount: 0.2 });
	});

	document.querySelectorAll<HTMLElement>(STAGGER_SELECTOR).forEach((container) => {
		inView(container, () => revealStagger(container), { amount: 0.15 });
	});
}
