import type { ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';
import { cancelEvent } from '@svelte-thing/dom-event';

export interface CreateComboboxPreviousConfig<TValue> {
	combobox: ComboboxRoot<TValue>;
}

export type ComboboxPrevious = ReturnType<typeof createComboboxPrevious>;

export function createComboboxPrevious<TValue>(
	config: CreateComboboxPreviousConfig<TValue>,
) {
	const { combobox } = config;

	return {
		props: {
			'data-st-combobox-previous-button': '',
			get ['aria-controls']() {
				return combobox.ids.listbox;
			},
			get ['aria-label']() {
				return 'Previous';
			},
			onmousedown(event: Event) {
				cancelEvent(event);
			},
			onclick() {
				combobox.setPreviousItemActive();
			},
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
