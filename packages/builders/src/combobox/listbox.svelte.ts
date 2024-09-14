import type { ComboboxBuilder } from './root.svelte.js';

export interface CreateComboboxListboxConfig<TOption> {
	combobox: ComboboxBuilder<TOption>;
}

export function createComboboxListbox<TOption>(
	config: CreateComboboxListboxConfig<TOption>,
) {
	const { combobox } = config;
	const listbox = {
		properties: {
			get ['aria-label']() {
				return combobox.label;
			},
			id: combobox.ids.listbox,
			role: 'listbox',
		},
	};

	return listbox;
}
