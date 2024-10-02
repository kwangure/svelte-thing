import { rootEvent, type ComboboxRoot } from './root.svelte.js';

export interface CreateComboboxListboxItemConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
	item: unknown;
}

export type ComboboxListboxItem = ReturnType<typeof createListboxItem>;

export function createListboxItem(config: CreateComboboxListboxItemConfig) {
	const { combobox } = config;
	const isActive = $derived(Object.is(config.item, combobox.activeItem));

	return {
		action(_node: HTMLElement) {},
		props: {
			get ['aria-selected']() {
				return isActive;
			},
			role: 'option',
			onclick() {
				combobox.emitEvent(rootEvent.set.value, config.item);
				combobox.emitEvent(rootEvent.close);
			},
			get ['data-active-item']() {
				return isActive || undefined;
			},
			get ['data-focus-visible']() {
				return isActive || undefined;
			},
		},
	};
}
