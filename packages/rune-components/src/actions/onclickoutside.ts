import { on } from 'svelte/events';

export function onclickoutside(node: HTMLElement) {
	const destroy = on(document, 'click', (event) => {
		if (!node.contains(event.target as Node)) {
			node.dispatchEvent(new MouseEvent('clickoutside', event));
		}
	});

	return { destroy };
}

export function onclickoutsiderect(node: HTMLElement) {
	const destroy = on(document, 'click', (event) => {
		if (!isClickInside(event, node)) {
			node.dispatchEvent(new MouseEvent('clickoutsiderect', event));
		}
	});

	return { destroy };
}

function isClickInside(event: MouseEvent, element: HTMLElement) {
	const rect = element.getBoundingClientRect();
	if (rect.width === 0 || rect.height === 0) return false;
	return (
		rect.top <= event.clientY &&
		event.clientY <= rect.bottom &&
		rect.left <= event.clientX &&
		event.clientX <= rect.right
	);
}
