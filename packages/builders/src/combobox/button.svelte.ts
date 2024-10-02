import type { HTMLButtonAttributes } from 'svelte/elements';
import type { ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../types.js';

export interface CreateComboboxButtonConfig<TOption> {
	combobox: ComboboxRoot<TOption>;
	label: string;
}

export type ComboboxButton = ReturnType<typeof createComboboxButton>;

export function createComboboxButton<TOption>(
	config: CreateComboboxButtonConfig<TOption>,
) {
	const { combobox } = config;

	return {
		props: {
			'data-st-combobox-button': '',
			get ['aria-controls']() {
				return combobox.ids.listbox;
			},
			get ['aria-expanded']() {
				return combobox.isOpen;
			},
			get ['aria-label']() {
				return config.label;
			},
			onclick() {
				if (combobox.isOpen) {
					combobox.close();
				} else {
					combobox.open();
				}
			},
			tabindex: -1,
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
