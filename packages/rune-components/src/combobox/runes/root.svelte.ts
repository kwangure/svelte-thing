import type { RuneComponent } from '../../types.js';
import { invariant, mergeActions } from '@svelte-thing/component-utils';
import { onclickoutside } from '@svelte-thing/components/actions';
import { uid } from 'uid';

export interface CreateComboboxRootConfig<TValue> {
	filter?: ComboboxFilter<TValue>;
	hasInputCompletion?: false;
	includesBaseElement?: boolean;
	isOpen?: boolean;
	label: string;
	options?: ComboboxOption<TValue>[];
	optionToString?: (selectedValue: TValue) => string;
	value?: ComboboxOption<TValue>;
}

export type ComboboxFilter<TValue> = (
	args: ComboboxFilterArg<TValue>,
) => ComboboxOption<TValue>[];

export interface ComboboxFilterArg<TValue> {
	readonly options?: ComboboxOption<TValue>[];
	readonly inputValue: string;
}

export interface ComboboxOption<TValue> {
	key: string;
	value: TValue;
}

export type ComboboxRoot<TValue> = ReturnType<
	typeof createComboboxRoot<TValue>
>;

export type ComboboxVisualFocus = 'listbox' | 'input';

export function createComboboxRoot<TValue>(
	config: CreateComboboxRootConfig<TValue>,
) {
	let inputValue = $state('');
	let isOpen = $state(config.isOpen ?? false);
	const options = $state(config.options);
	let value = $state<ComboboxOption<TValue> | undefined>(config.value);
	let visualFocus = $state<ComboboxVisualFocus>(isOpen ? 'listbox' : 'input');

	const setActiveItemListeners = new Set<
		(arg: ComboboxOption<TValue> | undefined) => void
	>();
	const setIsOpenListeners = new Set<(arg: boolean) => void>();
	const setValueListeners = new Set<
		(arg: ComboboxOption<TValue> | undefined) => void
	>();

	const filteredOptions = $derived.by(() => {
		if (typeof config.filter !== 'function') {
			return config.options || [];
		}
		return config.filter({
			options: config.options,
			inputValue,
		} satisfies ComboboxFilterArg<TValue>);
	});
	let activeItemIndex = $state(
		filteredOptions.findIndex((o) => o.key === value?.key),
	);
	const activeItem = $derived(filteredOptions[activeItemIndex]);

	function setActiveItemIndex(index: number) {
		activeItemIndex = index;
		for (const listener of setActiveItemListeners) {
			listener(activeItem);
		}
	}

	function setIsOpen(value: boolean) {
		isOpen = value;
		for (const fn of setIsOpenListeners) {
			fn(isOpen);
		}
	}

	function close() {
		visualFocus = 'input';
		setActiveItemIndex(
			filteredOptions.findIndex((o) => o.key === value?.key),
		);
		setIsOpen(false);
	}

	return {
		action: mergeActions(onclickoutside, () => ({
			destroy() {
				setActiveItemListeners.clear();
				setIsOpenListeners.clear();
				setValueListeners.clear();
			},
		})),
		get activeItem() {
			return activeItem;
		},
		get activeItemIndex() {
			return activeItemIndex;
		},
		get optionToString() {
			return config.optionToString;
		},
		get filter() {
			return config.filter;
		},
		get filteredOptions() {
			return filteredOptions;
		},
		get hasInputCompletion() {
			return config.hasInputCompletion ?? false;
		},
		get inputValue() {
			return inputValue;
		},
		get isOpen() {
			return isOpen;
		},
		get label() {
			return config.label;
		},
		get options() {
			return options;
		},
		get value() {
			return value;
		},
		get visualFocus() {
			return visualFocus;
		},
		ids: {
			input: uid(),
			listbox: uid(),
		},
		clearActiveItem() {
			visualFocus = 'input';
			setActiveItemIndex(-1);
		},
		close,
		onSetActiveItem(fn: (arg: ComboboxOption<TValue> | undefined) => void) {
			setActiveItemListeners.add(fn);
			return () => setActiveItemListeners.delete(fn);
		},
		onSetIsOpen(fn: (arg: boolean) => void) {
			setIsOpenListeners.add(fn);
			return () => setIsOpenListeners.delete(fn);
		},
		onSetValue(fn: (arg: ComboboxOption<TValue> | undefined) => void) {
			setValueListeners.add(fn);
			return () => setValueListeners.delete(fn);
		},
		open() {
			setIsOpen(true);
		},
		setFirstItemActive() {
			visualFocus = 'listbox';
			setActiveItemIndex(0);
		},
		setInputValue(value: string) {
			inputValue = value;
		},
		setLastItemActive() {
			visualFocus = 'listbox';
			setActiveItemIndex(filteredOptions.length - 1);
		},
		setNextItemActive() {
			const minValue = config.includesBaseElement ? -1 : 0;
			const maxValue = filteredOptions.length - 1;
			visualFocus =
				activeItemIndex === maxValue && config.includesBaseElement
					? 'input'
					: 'listbox';
			setActiveItemIndex(
				activeItemIndex === maxValue ? minValue : activeItemIndex + 1,
			);
		},
		setPreviousItemActive() {
			const minValue = config.includesBaseElement ? -1 : 0;
			const maxValue = filteredOptions.length - 1;
			visualFocus = 'listbox';
			setActiveItemIndex(
				activeItemIndex <= minValue ? maxValue : activeItemIndex - 1,
			);
		},
		setValue(v: ComboboxOption<TValue> | undefined) {
			const index = filteredOptions.findIndex((o) => o.key === v?.key);
			invariant(
				index > -1 || v === undefined,
				'`setValue(...)` argument must be in `filteredOptions`.',
			);
			value = v;
			for (const fn of setValueListeners) {
				fn(value);
			}
			if (activeItem?.key !== v?.key) {
				setActiveItemIndex(index);
			}
		},
		props: {
			'data-st-combobox-root': '',
			onclickoutside() {
				close();
			},
		},
	} satisfies RuneComponent<'div'>;
}
