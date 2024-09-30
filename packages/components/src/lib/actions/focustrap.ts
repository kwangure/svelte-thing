import { getFocusableElements } from '../dom/dom.js';

export function focustrap(
	node: HTMLElement,
	options?: { shouldTrapFocus?: () => boolean },
) {
	const shouldTrapFocus = options?.shouldTrapFocus || (() => true);

	function handleKeydown(event: KeyboardEvent) {
		if (!shouldTrapFocus()) return;
		// ignore if Tab is not pressed
		if (event.key !== 'Tab' && event.keyCode !== 9) return;

		const focusableElements = getFocusableElements(node);
		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				event.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				event.preventDefault();
			}
		}
	}

	node.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
		},
	};
}
