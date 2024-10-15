import type { RuneComponent } from '../../types.js';
import type { ComboboxRoot } from './root.svelte.js';

export interface CreateComboboxLabelConfig<TValue> {
	combobox: ComboboxRoot<TValue>;
}

export type ComboboxLabel = ReturnType<typeof createComboboxLabel>;

export function createComboboxLabel<TValue>(
	config: CreateComboboxLabelConfig<TValue>,
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
