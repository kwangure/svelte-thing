import type { RuneComponent } from '../../types.js';
import { mergeActions } from '@svelte-thing/component-utils';
import { onclickoutside } from '../../actions/onclickoutside.js';
import { uid } from 'uid';

export interface CreateRootConfig<TValue> {
	hasInputCompletion?: false;
	includesBaseElement?: boolean;
	isOpen?: boolean;
	options: GetOptions<TValue>;
	optionToString?: (selectedValue: TValue) => string;
	value?: Option<TValue>;
}

export type GetOptions<TValue> = (args: GetOptionsArg) => Option<TValue>[];

export interface GetOptionsArg {
	readonly inputValue: string;
}

export interface Option<TValue> {
	key: string;
	value: TValue;
}

export type TRoot<TValue = unknown> = ReturnType<typeof createRoot<TValue>>;

export type VisualFocus = 'listbox' | 'input';

export function createRoot<TValue>(config: CreateRootConfig<TValue>) {
	let inputValue = $state('');
	let isOpen = $state(config.isOpen ?? false);
	let value = $state<Option<TValue> | undefined>(config.value);
	let visualFocus = $state<VisualFocus>(isOpen ? 'listbox' : 'input');

	let getOptions = config.options;
	let options = $state([] as Option<TValue>[]);
	let hasFiltering = $state(false);
	setOptions();

	let activeItemIndex = $state(
		options.findIndex((o) => o.key === value?.key),
	);
	const activeItem = $derived(options[activeItemIndex]);

	type OptionListener = (arg: Option<TValue> | undefined) => void;
	const setActiveItemListeners = new Set<OptionListener>();
	const setIsOpenListeners = new Set<(arg: boolean) => void>();
	const setValueListeners = new Set<OptionListener>();

	function setActiveItemIndex(index: number) {
		activeItemIndex = index;
		for (const listener of setActiveItemListeners) {
			listener(activeItem);
		}
	}

	function setInputValue(value: string) {
		inputValue = value;
		setOptions();
	}

	function setIsOpen(value: boolean) {
		isOpen = value;
		for (const fn of setIsOpenListeners) {
			fn(isOpen);
		}
	}

	function setOptions() {
		// Whether the options are filtered based on `inputValue`
		let wasFiltered = false;
		options = getOptions({
			get inputValue() {
				wasFiltered = true;
				return inputValue;
			},
		});
		hasFiltering = wasFiltered;
	}

	function valueToString() {
		if (config.optionToString && value) {
			return config.optionToString(value.value);
		}
		return String(value?.value ?? '');
	}

	function close() {
		visualFocus = 'input';
		setActiveItemIndex(options.findIndex((o) => o.key === value?.key));
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
		get hasFiltering() {
			return hasFiltering;
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
		onSetActiveItem(fn: (arg: Option<TValue> | undefined) => void) {
			setActiveItemListeners.add(fn);
			return () => setActiveItemListeners.delete(fn);
		},
		onSetIsOpen(fn: (arg: boolean) => void) {
			setIsOpenListeners.add(fn);
			return () => setIsOpenListeners.delete(fn);
		},
		onSetValue(fn: (arg: Option<TValue> | undefined) => void) {
			setValueListeners.add(fn);
			return () => setValueListeners.delete(fn);
		},
		open() {
			setIsOpen(true);
		},
		setInputValue,
		setNextItemActive() {
			const minValue = config.includesBaseElement ? -1 : 0;
			const maxValue = options.length - 1;
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
			const maxValue = options.length - 1;
			visualFocus = 'listbox';
			setActiveItemIndex(
				activeItemIndex <= minValue ? maxValue : activeItemIndex - 1,
			);
		},
		setValue(v: Option<TValue> | undefined) {
			value = v;
			for (const fn of setValueListeners) {
				fn(value);
			}
			setInputValue(valueToString());
			setActiveItemIndex(options.findIndex((o) => o.key === v?.key));
		},
		setOptions(g: GetOptions<TValue>) {
			getOptions = g;
			setOptions();
			const activeItemKey = activeItem?.key;
			const valueKey = value?.key;
			let findActiveItemIndex = -1;
			let findValueIndex = -1;
			for (let index = 0; index < options.length; index++) {
				const key = options[index]?.key;
				if (key == activeItemKey) findActiveItemIndex = index;
				if (key == valueKey) findValueIndex = index;
				if (findActiveItemIndex > 0 && findValueIndex > 0) break;
			}
			setActiveItemIndex(findActiveItemIndex);
			if (findValueIndex == -1) {
				value = undefined;
				inputValue = '';
				for (const fn of setValueListeners) {
					fn(value);
				}
			}
		},
		valueToString,
		props: {
			'data-st-combobox-root': '',
			onclickoutside() {
				close();
			},
		},
	} satisfies RuneComponent<'div'>;
}
