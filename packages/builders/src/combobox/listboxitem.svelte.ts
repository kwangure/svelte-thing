import { rootEvent, type ComboboxBuilder } from './root.svelte.js';

export interface ComboboxListboxItemState<T> {
	operations: {
		selectItem(value: T): void;
	};
}

export interface CreateComboboxListboxItemConfig<TOption> {
	combobox: ComboboxBuilder<TOption>;
	value: TOption;
}

export function createListboxItem<TOption>(
	config: CreateComboboxListboxItemConfig<TOption>,
) {
	const { combobox } = config;
	const isActive = $derived(Object.is(config.value, combobox.activeItem));

	return {
		action(_node: HTMLElement) {},
		properties: {
			get ['aria-selected']() {
				return isActive;
			},
			role: 'option',
			onclick() {
				combobox.emitEvent(rootEvent.set.value, config.value);
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
