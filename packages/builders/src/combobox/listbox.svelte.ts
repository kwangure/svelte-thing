import type { ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../types.js';

export interface CreateComboboxListboxConfig<TOption> {
	combobox: ComboboxRoot<TOption>;
}

export type ComboboxListbox = ReturnType<typeof createComboboxListbox>;

export function createComboboxListbox<TOption>(
	config: CreateComboboxListboxConfig<TOption>,
) {
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
	} satisfies RuneComponent<'div'>;
}
