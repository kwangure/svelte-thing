import { rootEvent, type ComboboxBuilder } from './root.svelte.js';
import { cancelEvent } from '@svelte-thing/dom-event';

interface CreateColorListPreviousConfig<TOption> {
	combobox: ComboboxBuilder<TOption>;
	label: string;
}

export function createComboboxPrevious<TOption>(
	config: CreateColorListPreviousConfig<TOption>,
) {
	const { combobox } = config;

	return {
		properties: {
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
