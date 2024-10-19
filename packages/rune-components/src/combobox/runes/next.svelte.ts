import type { ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';
import { cancelEvent } from '@svelte-thing/dom-event';

export interface CreateComboboxNextConfig<TValue> {
	combobox: ComboboxRoot<TValue>;
}

export type ComboboxNext = ReturnType<typeof createComboboxNext>;

export function createComboboxNext<TValue>(
	config: CreateComboboxNextConfig<TValue>,
) {
	const { combobox } = config;

	return {
		props: {
			'data-st-combobox-next': '',
			get ['aria-controls']() {
				return combobox.ids.listbox;
			},
			get ['aria-label']() {
				return 'Next';
			},
			onmousedown(event: Event) {
				cancelEvent(event);
			},
			onclick() {
				combobox.setNextItemActive();
			},
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
