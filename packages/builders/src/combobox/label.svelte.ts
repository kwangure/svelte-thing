import type { RuneComponent } from '../types.js';
import type { ComboboxRoot } from './root.svelte.js';
import type { HTMLLabelAttributes } from 'svelte/elements';

export interface CreateComboboxLabelConfig<TOption> {
	combobox: ComboboxRoot<TOption>;
}

export type ComboboxLabel = ReturnType<typeof createComboboxLabel>;

export function createComboboxLabel<TOption>(
	config: CreateComboboxLabelConfig<TOption>,
) {
	const { combobox } = config;
	return {
		props: {
			'data-st-combobox-label': '',
			get for() {
				return combobox.ids.input;
			},
		},
	} satisfies RuneComponent<'label'>;
}
