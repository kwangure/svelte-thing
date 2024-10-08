import { type ComboboxRoot } from './root.svelte.js';

export interface CreateComboboxListboxItemConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
	item: unknown;
}

export type ComboboxListboxItem = ReturnType<typeof createListboxItem>;

export function createListboxItem(config: CreateComboboxListboxItemConfig) {
	const { combobox } = config;
	const isActive = $derived(Object.is(config.item, combobox.activeItem));

	let element: HTMLElement | undefined;
	combobox.onSetValue((value) => {
		if (Object.is(config.item, value)) {
			element?.scrollIntoView({ block: 'nearest' });
		}
	});

	return {
		action(_element: HTMLElement) {
			element = _element;
			return {
				destroy() {
					element = undefined;
				},
			};
		},
		props: {
			get ['aria-selected']() {
				return isActive;
			},
			role: 'option',
			onclick() {
				combobox.setValue(config.item);
				combobox.close();
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
