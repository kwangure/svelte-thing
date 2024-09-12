import { ROOT, type ComboboxBuilder } from './root.svelte.js';

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
	const { operations } = combobox;
	const isActive = $derived(Object.is(config.value, combobox.activeItem));

	let element: HTMLElement;

	return {
		action(node: HTMLElement) {
			element = node;
		},
		get element() {
			return element;
		},
		get isActive() {
			return isActive;
		},
		properties: {
			get ['aria-selected']() {
				return isActive;
			},
			role: 'option',
			onclick() {
				operations.emitEvent(ROOT.SET.VALUE, config.value);
				operations.close();
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
