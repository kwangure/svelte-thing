import type { ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../types.js';
import { cancelEvent } from '@svelte-thing/dom-event';

export interface CreateComboboxPreviousConfig<TOption> {
	combobox: ComboboxRoot<TOption>;
	label: string;
}

export type ComboboxPrevious = ReturnType<typeof createComboboxPrevious>;

export function createComboboxPrevious<TOption>(
	config: CreateComboboxPreviousConfig<TOption>,
) {
	const { combobox } = config;

	return {
		props: {
			'data-st-combobox-previous': '',
			get ['aria-controls']() {
				return combobox.ids.listbox;
			},
			get ['aria-label']() {
				return config.label;
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
