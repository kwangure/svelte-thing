import type { ComboboxBuilder } from './root.svelte.js';

export interface CreateComboboxButtonConfig<TOption> {
	combobox: ComboboxBuilder<TOption>;
	label: string;
}

export function createComboboxButton<TOption>(
	config: CreateComboboxButtonConfig<TOption>,
) {
	const { combobox } = config;
	const { operations } = combobox;
	const properties = {
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
				operations.close();
			} else {
				operations.open();
			}
		},
		tabindex: -1,
		type: 'button' as const,
	};

	const button = {
		properties,
	};

	return button;
}
