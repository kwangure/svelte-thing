import type { RuneComponent } from '../types.js';
import { mergeActions } from '@svelte-thing/component-utils';
import { onclickoutside } from '@svelte-thing/components/actions';
import { uid } from 'uid';

export interface CreateComboboxRootConfig<TOption> {
	filter?: ComboboxFilter<TOption>;
	hasInputCompletion?: false;
	includesBaseElement?: boolean;
	label: string;
	options?: TOption[];
	optionToString?: (selectedValue: TOption) => string;
}

export type ComboboxFilter<TOption> = (
	args: ComboboxFilterArg<TOption>,
) => TOption[];

export interface ComboboxFilterArg<TOption> {
	readonly options?: TOption[];
	readonly inputValue: string;
}

export type ComboboxRoot<TOption> = ReturnType<
	typeof createComboboxRoot<TOption>
>;

export type ComboboxVisualFocus = 'listbox' | 'input';

export function createComboboxRoot<TOption>(
	config: CreateComboboxRootConfig<TOption>,
) {
	let activeItemIndex = $state(-1);
	let inputValue = $state('');
	let isOpen = $state(false);
	let value = $state<TOption>();
	let visualFocus = $state<ComboboxVisualFocus>('input');

	const setActiveItemListeners = new Set<(arg: TOption) => void>();
	const setInputValueListeners = new Set<(arg: string) => void>();
	const setValueListeners = new Set<(arg: TOption) => void>();

	const filteredOptions = $derived.by(() => {
		if (typeof config.filter !== 'function') {
			return config.options || [];
		}
		return config.filter({
			options: config.options,
			inputValue,
		} satisfies ComboboxFilterArg<TOption>);
	});
	// TODO: what happens if `options.length` decreases thus decreasing
	// `filteredOptions.length` to less than the `activeItemIndex`
	// Maybe do `activeItemIndex = Math.max(activeItemIndex, options.length)`
	// when `options` is updated? But I don't want to use an $effect.
	// Maybe something like $state.link() using $derived? TODO.
	const activeItem = $derived(filteredOptions[activeItemIndex]);

	function setActiveItemIndex(index: number) {
		activeItemIndex = index;
		for (const listener of setActiveItemListeners) {
			listener(activeItem as TOption);
		}
	}

	function close() {
		isOpen = false;
		visualFocus = 'input';
		setActiveItemIndex(-1);
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
			return config.options;
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
		onSetActiveItem(fn: (arg: TOption) => void) {
			setActiveItemListeners.add(fn);
			return () => setActiveItemListeners.delete(fn);
		},
		onSetInputValue(fn: (arg: string) => void) {
			setInputValueListeners.add(fn);
			return () => setInputValueListeners.delete(fn);
		},
		onSetValue(fn: (arg: TOption) => void) {
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
		setValue(v: TOption) {
			value = v;
			for (const fn of setValueListeners) {
				fn(value);
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
