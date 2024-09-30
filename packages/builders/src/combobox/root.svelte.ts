import {
	appendChild,
	clearChildren,
	emitEvent,
	node,
	removeChild,
	type StateNode,
} from '@svelte-thing/state-event';
import { inputEvent } from './input.svelte.js';
import { onclickoutside } from '@svelte-thing/components/actions';
import { uid } from 'uid';
import { mergeActions } from '@svelte-thing/component-utils';

export interface CreateCombmboxConfig<TOption> {
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

export type ComboboxBuilder<TOption> = ReturnType<
	typeof createCombobox<TOption>
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

export function createCombobox<TOption>(config: CreateCombmboxConfig<TOption>) {
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

	let state: StateNode | undefined;

	function _appendChild(child: StateNode) {
		// TODO: Add DEV warning `state === undefined`
		if (!state) return;
		appendChild(state, child);
	}

	function _emitEvent(type: string, value?: unknown) {
		// TODO: Add DEV warning `state === undefined`
		if (!state) return;
		emitEvent(state, type, value);
	}

	function _removeChild(child: StateNode) {
		// TODO: Add DEV warning `state === undefined`
		if (!state) return;
		removeChild(state, child);
	}

	function setup() {
		if (state) return;
		// TODO: validate event values in DEV mode
		state = node({
			on: {
				[inputEvent.input](event: unknown) {
					inputValue = (event as Event & { currentTarget: HTMLInputElement })
						.currentTarget.value;
				},
				[rootEvent.clear.activeItem]() {
					_emitEvent(rootEvent.set.activeItemIndex, -1);
					_emitEvent(rootEvent.set.visualFocus, 'input');
				},
				[rootEvent.close]() {
					_emitEvent(rootEvent.set.isOpen, false);
					_emitEvent(rootEvent.set.activeItemIndex, -1);
					_emitEvent(rootEvent.set.visualFocus, 'input');
				},
				[rootEvent.open]() {
					_emitEvent(rootEvent.set.isOpen, true);
				},
				[rootEvent.set.activeItemIndex](value: unknown) {
					activeItemIndex = value as number;
				},
				[rootEvent.set.firstItemActive]() {
					_emitEvent(rootEvent.set.activeItemIndex, 0);
					_emitEvent(rootEvent.set.visualFocus, 'listbox');
				},
				[rootEvent.set.isOpen](value: unknown) {
					isOpen = value as boolean;
				},
				[rootEvent.set.lastItemActive]() {
					_emitEvent(rootEvent.set.activeItemIndex, filteredOptions.length - 1);
					_emitEvent(rootEvent.set.visualFocus, 'listbox');
				},
				[rootEvent.set.nextItemActive]() {
					// - Set to: 0,...,activeCollection.length,0,...
					// - For activeCollection[activeCollection.length] i.e. `undefined`, focus is set on the input
					const length =
						filteredOptions.length + +Boolean(config.includesBaseElement);
					_emitEvent(
						rootEvent.set.activeItemIndex,
						(activeItemIndex + 1) % length,
					);
					_emitEvent(rootEvent.set.visualFocus, 'listbox');
				},
				[rootEvent.set.previousItemActive]() {
					// - Set to: activeCollection.length,...,0,activeCollection.length,...
					// - For activeCollection[activeCollection.length] i.e. `undefined`, focus is set on the input
					const length =
						filteredOptions.length + +Boolean(config.includesBaseElement);
					_emitEvent(
						rootEvent.set.activeItemIndex,
						-(activeItemIndex - 1 + length) % length,
					);
					_emitEvent(rootEvent.set.visualFocus, 'listbox');
				},
				[rootEvent.set.value](v: unknown) {
					value = v as TOption;
				},
				[rootEvent.set.visualFocus](v: unknown) {
					visualFocus = v as ComboboxVisualFocus;
				},
			},
		});
	}

	setup();

	function destroy() {
		if (!state) return;

		clearChildren(state);
		state = undefined;
	}

	return {
		action: mergeActions(onclickoutside, () => {
			setup();

			return { destroy };
		}),
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
		appendChild: _appendChild,
		emitEvent: _emitEvent,
		removeChild: _removeChild,
		properties: {
			onclickoutside() {
				_emitEvent(rootEvent.close);
			},
		},
	};
}
