import { INPUT } from './input.svelte.js';
import {
	appendChild,
	emitEvent,
	node,
	type StateNode,
} from '@svelte-thing/state-event';
import { uid } from 'uid';

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

const createRoot = (...type: (string | number)[]) => `root.${type.join('.')}`;

export const ROOT = {
	SET: {
		ACTIVE_ITEM_INDEX: createRoot('set', 'activeItemIndex'),
		ISOPEN: createRoot('set', 'isOpen'),
		VALUE: createRoot('set', 'value'),
		VISUAL_FOCUS: createRoot('set', 'visualFocus'),
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
	// TODO: validate event values in DEV mode
	const state = node({
		on: {
			[INPUT.INPUT](event: unknown) {
				inputValue = (event as Event & { currentTarget: HTMLInputElement })
					.currentTarget.value;
			},
			[ROOT.SET.ACTIVE_ITEM_INDEX](value: unknown) {
				activeItemIndex = value as number;
			},
			[ROOT.SET.VALUE](v: unknown) {
				value = v as TOption;
			},
			[ROOT.SET.VISUAL_FOCUS](v: unknown) {
				visualFocus = v as ComboboxVisualFocus;
			},
		},
	});
	const activeItem = $derived(filteredOptions[activeItemIndex]);
	const operations = {
		appendChild(child: StateNode) {
			appendChild(state, child);
		},
		clearActiveItem() {
			operations.emitEvent(ROOT.SET.ACTIVE_ITEM_INDEX, -1);
			operations.emitEvent(ROOT.SET.VISUAL_FOCUS, 'input');
		},
		close() {
			isOpen = false;
			operations.emitEvent(ROOT.SET.ACTIVE_ITEM_INDEX, -1);
			visualFocus = 'input';
		},
		closeAndSetValueToItem(v: TOption) {
			operations.emitEvent(ROOT.SET.VALUE, v);
			operations.close();
		},
		emitEvent(type: string, value: unknown) {
			emitEvent(state, type, value);
		},
		open() {
			isOpen = true;
		},
		openAndSetFirstItemActive() {
			isOpen = true;
			visualFocus = 'listbox';
			operations.emitEvent(ROOT.SET.ACTIVE_ITEM_INDEX, 0);
		},
		openAndSetLastItemActive() {
			isOpen = true;
			visualFocus = 'listbox';
			operations.emitEvent(
				ROOT.SET.ACTIVE_ITEM_INDEX,
				filteredOptions.length - 1,
			);
		},
		setVisualFocusInputAndClearActiveItem() {
			visualFocus = 'input';
			operations.emitEvent(ROOT.SET.ACTIVE_ITEM_INDEX, -1);
		},
		setNextActiveItem() {
			// - Set to: 0,...,activeCollection.length,0,...
			// - For activeCollection[activeCollection.length] i.e. `undefined`, focus is set on the input
			const length =
				filteredOptions.length + +Boolean(config.includesBaseElement);
			operations.emitEvent(
				ROOT.SET.ACTIVE_ITEM_INDEX,
				(activeItemIndex + 1) % length,
			);
			visualFocus = 'listbox';
		},
		setPreviousActiveItem() {
			// - Set to: activeCollection.length,...,0,activeCollection.length,...
			// - For activeCollection[activeCollection.length] i.e. `undefined`, focus is set on the input
			const length =
				filteredOptions.length + +Boolean(config.includesBaseElement);
			operations.emitEvent(
				ROOT.SET.ACTIVE_ITEM_INDEX,
				-(activeItemIndex - 1 + length) % length,
			);
			visualFocus = 'listbox';
		},
	};

	return {
		action: onclickoutside,
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
				operations.close();
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
