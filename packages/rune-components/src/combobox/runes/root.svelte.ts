import type { RuneComponent } from '../../types.js';
import { invariant, mergeActions } from '@svelte-thing/component-utils';
import { onclickoutside } from '@svelte-thing/components/actions';
import { uid } from 'uid';

export interface CreateComboboxRootConfig<TOption> {
	filter?: ComboboxFilter<TOption>;
	hasInputCompletion?: false;
	includesBaseElement?: boolean;
	isOpen?: boolean;
	label: string;
	options?: { key: string; value: TOption }[];
	optionToString?: (selectedValue: { key: string; value: TOption }) => string;
	value?: { key: string; value: TOption };
}

export type ComboboxFilter<TOption> = (
	args: ComboboxFilterArg<TOption>,
) => { key: string; value: TOption }[];

export interface ComboboxFilterArg<TOption> {
	readonly options?: { key: string; value: TOption }[];
	readonly inputValue: string;
}

export type ComboboxRoot<TOption> = ReturnType<
	typeof createComboboxRoot<TOption>
>;

export type ComboboxVisualFocus = 'listbox' | 'input';

export function createComboboxRoot<TOption>(
	config: CreateComboboxRootConfig<TOption>,
) {
	let inputValue = $state('');
	let isOpen = $state(config.isOpen ?? false);
	const options = $state(config.options);
	let value = $state<{ key: string; value: TOption } | undefined>(
		config.value,
	);
	let visualFocus = $state<ComboboxVisualFocus>(isOpen ? 'listbox' : 'input');

	const setActiveItemListeners = new Set<
		(arg: { key: string; value: TOption } | undefined) => void
	>();
	const setInputValueListeners = new Set<(arg: string) => void>();
	const setValueListeners = new Set<
		(arg: { key: string; value: TOption } | undefined) => void
	>();

	const filteredOptions = $derived.by(() => {
		if (typeof config.filter !== 'function') {
			return config.options || [];
		}
		return config.filter({
			options: config.options,
			inputValue,
		} satisfies ComboboxFilterArg<TOption>);
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

	function close() {
		isOpen = false;
		visualFocus = 'input';
		setActiveItemIndex(
			filteredOptions.findIndex((o) => o.key === value?.key),
		);
	}

	return {
		action: mergeActions(onclickoutside, () => ({
			destroy() {
				setActiveItemListeners.clear();
				setInputValueListeners.clear();
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
		onSetActiveItem(
			fn: (arg: { key: string; value: TOption } | undefined) => void,
		) {
			setActiveItemListeners.add(fn);
			return () => setActiveItemListeners.delete(fn);
		},
		onSetInputValue(fn: (arg: string) => void) {
			setInputValueListeners.add(fn);
			return () => setInputValueListeners.delete(fn);
		},
		onSetValue(
			fn: (arg: { key: string; value: TOption } | undefined) => void,
		) {
			setValueListeners.add(fn);
			return () => setValueListeners.delete(fn);
		},
		open() {
			isOpen = true;
		},
		setFirstItemActive() {
			visualFocus = 'listbox';
			setActiveItemIndex(0);
		},
		setInputValue(value: string) {
			inputValue = value;
			for (const fn of setInputValueListeners) {
				fn(value);
			}
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
		setValue(v: { key: string; value: TOption } | undefined) {
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
