import { INPUT_SET_VALUE } from './input.svelte.js';
import { mergeActions } from '@svelte-thing/component-utils';
import { onclickoutside } from '@svelte-thing/components/actions';
import { StateNode } from '@svelte-thing/state-event';
import { uid } from 'uid';

export interface CreateCombmboxRootConfig<TOption> {
	filter?: ComboboxFilter<TOption>;
	hasInputCompletion?: false;
	includesBaseElement?: boolean;
	label: string;
	options?: TOption[];
	setInputValue?: (selectedValue: TOption) => string;
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

const createRootEvent = (...type: (string | number)[]) =>
	`root.${type.join('.')}`;

export const rootEvent = {
	clear: {
		activeItem: createRootEvent('clear', 'activeItem'),
	},
	close: createRootEvent('close'),
	open: createRootEvent('open'),
	set: {
		activeItemIndex: createRootEvent('set', 'activeItemIndex'),
		firstItemActive: createRootEvent('set', 'firstItemActive'),
		lastItemActive: createRootEvent('set', 'lastItemActive'),
		nextItemActive: createRootEvent('set', 'nextItemActive'),
		previousItemActive: createRootEvent('set', 'previousItemActive'),
		isOpen: createRootEvent('set', 'isOpen'),
		value: createRootEvent('set', 'value'),
		visualFocus: createRootEvent('set', 'visualFocus'),
	},
};

export type ComboboxVisualFocus = 'listbox' | 'input';

export function createComboboxRoot<TOption>(
	config: CreateCombmboxRootConfig<TOption>,
) {
	let activeItemIndex = $state(-1);
	let inputValue = $state('');
	let isOpen = $state(false);
	let value = $state<TOption>();
	let visualFocus = $state<ComboboxVisualFocus>('input');
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
	const state = new StateNode({
		on: {
			[INPUT_SET_VALUE](event: unknown) {
				inputValue = (event as Event & { currentTarget: HTMLInputElement })
					.currentTarget.value;
			},
			[rootEvent.clear.activeItem]() {
				state.emitEvent(rootEvent.set.activeItemIndex, -1);
				state.emitEvent(rootEvent.set.visualFocus, 'input');
			},
			[rootEvent.close]() {
				state.emitEvent(rootEvent.set.isOpen, false);
				state.emitEvent(rootEvent.set.activeItemIndex, -1);
				state.emitEvent(rootEvent.set.visualFocus, 'input');
			},
			[rootEvent.open]() {
				state.emitEvent(rootEvent.set.isOpen, true);
			},
			[rootEvent.set.activeItemIndex](value: unknown) {
				activeItemIndex = value as number;
			},
			[rootEvent.set.firstItemActive]() {
				state.emitEvent(rootEvent.set.activeItemIndex, 0);
				state.emitEvent(rootEvent.set.visualFocus, 'listbox');
			},
			[rootEvent.set.isOpen](value: unknown) {
				isOpen = value as boolean;
			},
			[rootEvent.set.lastItemActive]() {
				state.emitEvent(
					rootEvent.set.activeItemIndex,
					filteredOptions.length - 1,
				);
				state.emitEvent(rootEvent.set.visualFocus, 'listbox');
			},
			[rootEvent.set.nextItemActive]() {
				// - Set to: 0,...,activeCollection.length,0,...
				// - For activeCollection[activeCollection.length] i.e. `undefined`, focus is set on the input
				const length =
					filteredOptions.length + +Boolean(config.includesBaseElement);
				state.emitEvent(
					rootEvent.set.activeItemIndex,
					(activeItemIndex + 1) % length,
				);
				state.emitEvent(rootEvent.set.visualFocus, 'listbox');
			},
			[rootEvent.set.previousItemActive]() {
				// - Set to: activeCollection.length,...,0,activeCollection.length,...
				// - For activeCollection[activeCollection.length] i.e. `undefined`, focus is set on the input
				const length =
					filteredOptions.length + +Boolean(config.includesBaseElement);
				state.emitEvent(
					rootEvent.set.activeItemIndex,
					-(activeItemIndex - 1 + length) % length,
				);
				state.emitEvent(rootEvent.set.visualFocus, 'listbox');
			},
			[rootEvent.set.value](v: unknown) {
				value = v as TOption;
			},
			[rootEvent.set.visualFocus](v: unknown) {
				visualFocus = v as ComboboxVisualFocus;
			},
		},
	});

	return {
		action: mergeActions(onclickoutside, () => ({
			destroy() {
				state.clearChildren();
			},
		})),
		get activeItem() {
			return activeItem;
		},
		get activeItemIndex() {
			return activeItemIndex;
		},
		get setInputValue() {
			return config.setInputValue;
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
		appendChild(child: StateNode) {
			state.appendChild(child);
		},
		emitEvent(type: string, value?: unknown) {
			state.emitEvent(type, value);
		},
		removeChild(child: StateNode) {
			state.removeChild(child);
		},
		props: {
			onclickoutside() {
				state.emitEvent(rootEvent.close, undefined);
			},
		},
	};
}
