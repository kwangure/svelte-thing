import type { TRoot } from '../root/root.svelte.js';
import type { RuneComponent } from '../../types.js';
import { cancelEvent } from '@svelte-thing/dom-event';

export interface CreateNextConfig<TValue> {
	root: TRoot<TValue>;
}

export type TNext = ReturnType<typeof createNext>;

export function createNext<TValue>(config: CreateNextConfig<TValue>) {
	const { root } = config;

	return {
		props: {
			'data-st-combobox-next-button': '',
			get ['aria-controls']() {
				return root.ids.listbox;
			},
			get ['aria-label']() {
				return 'Next';
			},
			onmousedown(event: Event) {
				cancelEvent(event);
			},
			onclick() {
				root.setNextItemActive();
			},
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
