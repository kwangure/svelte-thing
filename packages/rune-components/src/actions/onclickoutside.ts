import { on } from 'svelte/events';

export function onclickoutside(node: HTMLElement) {
	const destroy = on(document, 'click', (event) => {
		if (!isClickInsideNode(event, node)) {
			node.dispatchEvent(new MouseEvent('clickoutside', event));
		}
	});

	return { destroy };
}

export function onclickoutsiderect(node: HTMLElement) {
	const destroy = on(document, 'click', (event) => {
		if (!isClickInsideRect(event, node)) {
			node.dispatchEvent(new MouseEvent('clickoutsiderect', event));
		}
	});

	return { destroy };
}

export function isClickInsideRect(event: MouseEvent, element: HTMLElement) {
	const rect = element.getBoundingClientRect();
	if (rect.width === 0 || rect.height === 0) return false;
	return (
		rect.top <= event.clientY &&
		event.clientY <= rect.bottom &&
		rect.left <= event.clientX &&
		event.clientX <= rect.right
	);
}

export function isClickInsideNode(event: MouseEvent, node: HTMLElement) {
	return node.contains(event.target as Node);
}
