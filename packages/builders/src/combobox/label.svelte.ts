import type { ComboboxBuilder } from './root.svelte.js';

export interface CreateComboboxLabelConfig<TOption> {
	combobox: ComboboxBuilder<TOption>;
}

export function createComboboxLabel<TOption>(
	config: CreateComboboxLabelConfig<TOption>,
) {
	const { combobox } = config;
	const label = {
		properties: {
			get for() {
				return combobox.ids.input;
			},
		},
	};

	return label;
}
