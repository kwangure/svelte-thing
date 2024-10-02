import { rootEvent, type ComboboxRoot } from './root.svelte.js';

export interface CreateComboboxButtonConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
	label: string;
}

export type ComboboxButton = ReturnType<typeof createComboboxButton>;

export function createComboboxButton(config: CreateComboboxButtonConfig) {
	const { combobox } = config;

	return {
		props: {
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
					combobox.emitEvent(rootEvent.close);
				} else {
					combobox.emitEvent(rootEvent.open);
				}
			},
			tabindex: -1,
			type: 'button' as const,
		},
	};
}
