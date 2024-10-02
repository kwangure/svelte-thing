import type { RuneComponent } from '../types.js';
import type { ComboboxRoot } from './root.svelte.js';
import type { HTMLLabelAttributes } from 'svelte/elements';

export interface CreateComboboxLabelConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
}

export type ComboboxLabel = ReturnType<typeof createComboboxLabel>;

export function createComboboxLabel(config: CreateComboboxLabelConfig) {
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
