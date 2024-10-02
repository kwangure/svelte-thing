import { rootEvent, type ComboboxRoot } from './root.svelte.js';
import { cancelEvent } from '@svelte-thing/dom-event';

export interface CreateComboboxPreviousConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
	label: string;
}

export type ComboboxPrevious = ReturnType<typeof createComboboxPrevious>;

export function createComboboxPrevious(config: CreateComboboxPreviousConfig) {
	const { combobox } = config;

	return {
		props: {
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
				combobox.emitEvent(rootEvent.set.previousItemActive);
			},
		},
	};
}
