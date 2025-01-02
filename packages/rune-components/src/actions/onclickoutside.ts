import { on } from 'svelte/events';

export function onclickoutside(node: HTMLElement) {
	const destroy = on(document, 'click', (event) => {
		if (!node.contains(event.target as Node)) {
			node.dispatchEvent(new MouseEvent('clickoutside', event));
		}
	});

	return { destroy };
}
