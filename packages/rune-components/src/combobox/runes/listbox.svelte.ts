import type { ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateComboboxListboxConfig<TValue> {
	combobox: ComboboxRoot<TValue>;
}

export type ComboboxListbox = ReturnType<typeof createComboboxListbox>;

export function createComboboxListbox<TValue>(
	config: CreateComboboxListboxConfig<TValue>,
) {
	const { combobox } = config;
	return {
		props: {
			'data-st-combobox-listbox': '',
			get ['aria-label']() {
				return 'Suggestions';
			},
			id: combobox.ids.listbox,
			role: 'listbox',
		},
	} satisfies RuneComponent<'div'>;
}
