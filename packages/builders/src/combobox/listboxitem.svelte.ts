import type { HTMLAttributes } from 'svelte/elements';
import { type ComboboxRoot } from './root.svelte.js';

export interface CreateComboboxListboxItemConfig<TOption> {
	combobox: ComboboxRoot<TOption>;
	item: TOption;
}

export type ComboboxListboxItem = ReturnType<typeof createListboxItem>;

export function createListboxItem<TOption>(
	config: CreateComboboxListboxItemConfig<TOption>,
) {
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
			'data-st-combobox-listbox-item': '',
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
		} satisfies HTMLAttributes<HTMLElement>,
	};
}
