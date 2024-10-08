import { type ComboboxRoot } from './root.svelte.js';
import { cancelEvent } from '@svelte-thing/dom-event';

export interface CreateColorListNextConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
	label: string;
}

export type ComboboxNext = ReturnType<typeof createComboboxNext>;

export function createComboboxNext(config: CreateColorListNextConfig) {
	const { combobox } = config;

	return {
		props: {
			'data-st-combobox-next': '',
			get ['aria-controls']() {
				return combobox.ids.listbox;
			},
			get ['aria-label']() {
				return config.label;
			},
			onmousedown(event: Event) {
				cancelEvent(event);
			},
			onclick() {
				combobox.setNextItemActive();
			},
		},
	};
}
