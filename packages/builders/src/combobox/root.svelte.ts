import { inputEvent } from './input.svelte.js';
import {
	appendChild,
	clearChildren,
	emitEvent,
	node,
	removeChild,
	type StateNode,
} from '@svelte-thing/state-event';
import { uid } from 'uid';
import { mergeActions } from '../helpers/mergeActions.js';

export interface CreateCombmboxConfig<TOption> {
	filter?: ComboboxFilter<TOption>;
	hasInputCompletion?: false;
	includesBaseElement?: boolean;
	label: string;
	onchange?: (selectedValue: TOption) => void;
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
	const operations = {
		appendChild(child: StateNode) {
			// TODO: Add DEV warning `state === undefined`
			if (!state) return;
			appendChild(state, child);
		},
		emitEvent(type: string, value?: unknown) {
			// TODO: Add DEV warning `state === undefined`
			if (!state) return;
			emitEvent(state, type, value);
		},
		removeChild(child: StateNode) {
			// TODO: Add DEV warning `state === undefined`
			if (!state) return;
			removeChild(state, child);
		},
	};

	return {
		action: mergeActions(onclickoutside, () => {
			// TODO: validate event values in DEV mode
			state = node({
				on: {
					[inputEvent.input](event: unknown) {
						inputValue = (event as Event & { currentTarget: HTMLInputElement })
							.currentTarget.value;
					},
					[rootEvent.clear.activeItem]() {
						operations.emitEvent(rootEvent.set.activeItemIndex, -1);
						operations.emitEvent(rootEvent.set.visualFocus, 'input');
					},
					[rootEvent.close]() {
						operations.emitEvent(rootEvent.set.isOpen, false);
						operations.emitEvent(rootEvent.set.activeItemIndex, -1);
						operations.emitEvent(rootEvent.set.visualFocus, 'input');
					},
					[rootEvent.open]() {
						operations.emitEvent(rootEvent.set.isOpen, true);
					},
					[rootEvent.set.activeItemIndex](value: unknown) {
						activeItemIndex = value as number;
					},
					[rootEvent.set.firstItemActive]() {
						operations.emitEvent(rootEvent.set.activeItemIndex, 0);
						operations.emitEvent(rootEvent.set.visualFocus, 'listbox');
					},
					[rootEvent.set.isOpen](value: unknown) {
						isOpen = value as boolean;
					},
					[rootEvent.set.lastItemActive]() {
						operations.emitEvent(
							rootEvent.set.activeItemIndex,
							filteredOptions.length - 1,
						);
						operations.emitEvent(rootEvent.set.visualFocus, 'listbox');
					},
					[rootEvent.set.nextItemActive]() {
						// - Set to: 0,...,activeCollection.length,0,...
						// - For activeCollection[activeCollection.length] i.e. `undefined`, focus is set on the input
						const length =
							filteredOptions.length + +Boolean(config.includesBaseElement);
						operations.emitEvent(
							rootEvent.set.activeItemIndex,
							(activeItemIndex + 1) % length,
						);
						operations.emitEvent(rootEvent.set.visualFocus, 'listbox');
					},
					[rootEvent.set.previousItemActive]() {
						// - Set to: activeCollection.length,...,0,activeCollection.length,...
						// - For activeCollection[activeCollection.length] i.e. `undefined`, focus is set on the input
						const length =
							filteredOptions.length + +Boolean(config.includesBaseElement);
						operations.emitEvent(
							rootEvent.set.activeItemIndex,
							-(activeItemIndex - 1 + length) % length,
						);
						operations.emitEvent(rootEvent.set.visualFocus, 'listbox');
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
				destroy() {
					if (state) {
						clearChildren(state);
					}
					state = undefined;
				},
			};
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
		operations,
		properties: {
			onclickoutside() {
				operations.emitEvent(rootEvent.close);
			},
		},
	};
}

function onclickoutside(node: HTMLElement) {
	function onclick(event: Event) {
		if (!node.contains(event.target as Node)) {
			const clickoutside = new Event('clickoutside', event);
			node.dispatchEvent(clickoutside);
		}
	}
	document.body.addEventListener('click', onclick);
	return {
		destroy() {
			document.body.removeEventListener('click', onclick);
		},
	};
}
