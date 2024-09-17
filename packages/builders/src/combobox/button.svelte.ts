import { rootEvent, type ComboboxBuilder } from './root.svelte.js';

export interface CreateComboboxButtonConfig<TOption> {
	combobox: ComboboxBuilder<TOption>;
	label: string;
}

export function createComboboxButton<TOption>(
	config: CreateComboboxButtonConfig<TOption>,
) {
	const { combobox } = config;
	const { operations } = combobox;

	return {
		properties: {
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
					operations.emitEvent(rootEvent.close);
				} else {
					operations.emitEvent(rootEvent.open);
				}
			},
			tabindex: -1,
			type: 'button' as const,
		},
	};
}
