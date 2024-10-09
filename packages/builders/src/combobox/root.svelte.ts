import type { HTMLAttributes, MouseEventHandler } from 'svelte/elements';
import { mergeActions } from '@svelte-thing/component-utils';
import { onclickoutside } from '@svelte-thing/components/actions';
import { uid } from 'uid';
import type { RuneComponent } from '../types';

export interface CreateComboboxRootConfig<TOption> {
	filter?: ComboboxFilter<TOption>;
	hasInputCompletion?: false;
	includesBaseElement?: boolean;
	label: string;
	options?: TOption[];
	optionToString?: (selectedValue: TOption) => string;
}

export interface ComboboxRootAttributes<T extends HTMLElement = HTMLElement>
	extends HTMLAttributes<T> {
	onclickoutside: MouseEventHandler<T>;
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

export const ROOT_SET_VALUE = 'root.set.value';

export type ComboboxVisualFocus = 'listbox' | 'input';

export function createComboboxRoot<TOption>(
	config: CreateComboboxRootConfig<TOption>,
) {
	let activeItemIndex = $state(-1);
	let inputValue = $state('');
	let isOpen = $state(false);
	let value = $state<TOption>();
	let visualFocus = $state<ComboboxVisualFocus>('input');

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
	const activeItem = $derived(filteredOptions[activeItemIndex]);

	function close() {
		activeItemIndex = -1;
		isOpen = false;
		visualFocus = 'input';
	}

	return {
		action: mergeActions(onclickoutside, () => ({
			destroy() {
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
			activeItemIndex = -1;
			visualFocus = 'input';
		},
		close,
		onSetInputValue(fn: (arg: string) => void) {
			setInputValueListeners.add(fn);
		},
		onSetValue(fn: (arg: TOption) => void) {
			setValueListeners.add(fn);
		},
		open() {
			isOpen = true;
		},
		setFirstItemActive() {
			activeItemIndex = 0;
			visualFocus = 'listbox';
		},
		setInputValue(value: string) {
			inputValue = value;
			for (const fn of setInputValueListeners) {
				fn(value);
			}
		},
		setLastItemActive() {
			activeItemIndex = filteredOptions.length - 1;
			visualFocus = 'listbox';
		},
		setNextItemActive() {
			const minValue = config.includesBaseElement ? -1 : 0;
			const maxValue = filteredOptions.length - 1;
			activeItemIndex =
				activeItemIndex === maxValue ? minValue : activeItemIndex + 1;
			visualFocus = activeItemIndex === -1 ? 'input' : 'listbox';
		},
		setPreviousItemActive() {
			const minValue = config.includesBaseElement ? -1 : 0;
			const maxValue = filteredOptions.length - 1;
			activeItemIndex =
				activeItemIndex <= minValue ? maxValue : activeItemIndex - 1;
			visualFocus = 'listbox';
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
