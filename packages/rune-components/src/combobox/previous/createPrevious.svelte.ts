import type { TRoot } from '../root/createRoot.svelte.js';
import type { RuneComponent } from '../../types.js';
import { cancelEvent } from '@svelte-thing/dom-event';

export interface CreatePreviousConfig<TValue> {
	root: TRoot<TValue>;
}

export type TPrevious = ReturnType<typeof createPrevious>;

export function createPrevious<TValue>(config: CreatePreviousConfig<TValue>) {
	const { root } = config;

	return {
		props: {
			'data-st-combobox-previous-button': '',
			get ['aria-controls']() {
				return root.ids.listbox;
			},
			get ['aria-label']() {
				return 'Previous';
			},
			onmousedown(event: Event) {
				cancelEvent(event);
			},
			onclick() {
				root.setPreviousItemActive();
			},
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
