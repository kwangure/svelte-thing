import type { ComboboxRoot } from './root.svelte.js';

export interface CreateComboboxListboxConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
}

export type ComboboxListbox = ReturnType<typeof createComboboxListbox>;

export function createComboboxListbox(config: CreateComboboxListboxConfig) {
	const { combobox } = config;
	return {
		props: {
			'data-st-combobox-listbox': '',
			get ['aria-label']() {
				return combobox.label;
			},
			id: combobox.ids.listbox,
			role: 'listbox',
		},
	};
}
