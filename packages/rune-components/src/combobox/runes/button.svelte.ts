import type { ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateComboboxButtonConfig<TValue> {
	combobox: ComboboxRoot<TValue>;
}

export type ComboboxButton = ReturnType<typeof createComboboxButton>;

export function createComboboxButton<TValue>(
	config: CreateComboboxButtonConfig<TValue>,
) {
	const { combobox } = config;

	return {
		props: {
			'data-st-combobox-trigger-button': '',
			get ['aria-controls']() {
				return combobox.ids.listbox;
			},
			get ['aria-expanded']() {
				return combobox.isOpen;
			},
			get ['aria-label']() {
				return 'Show suggestions';
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
