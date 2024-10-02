import { rootEvent, type ComboboxBuilder } from './root.svelte.js';
import {
	cancelEvent as cancelDOMEvent,
	encodeKeys,
	Keys,
	type KeyCode,
	keysFromEvent,
} from '@svelte-thing/dom-event';
import { clearChildren, node, type StateNode } from '@svelte-thing/state-event';

export interface CreateComboboxInputConfig<TOption> {
	combobox: ComboboxBuilder<TOption>;
}

const createInputEvent = (name: string, codes?: KeyCode[]) => {
	let key = `input.${name}`;
	if (codes?.length) {
		key += `.${encodeKeys(codes)}`;
	}
	return key;
};

export const inputEvent = {
	input: createInputEvent('input'),
	keydown: {
		AltArrowDown: createInputEvent('keydown', [Keys.Alt, Keys.ArrowDown]),
		ArrowDown: createInputEvent('keydown', [Keys.ArrowDown]),
		AltArrowUp: createInputEvent('keydown', [Keys.Alt, Keys.ArrowUp]),
		ArrowUp: createInputEvent('keydown', [Keys.ArrowUp]),
		End: createInputEvent('keydown', [Keys.End]),
		Enter: createInputEvent('keydown', [Keys.Enter]),
		Escape: createInputEvent('keydown', [Keys.Escape]),
		Home: createInputEvent('keydown', [Keys.Home]),
		Tab: createInputEvent('keydown', [Keys.Tab]),
	},
	keyup: {
		Backspace: createInputEvent('keyup', [Keys.Backspace]),
		Delete: createInputEvent('keyup', [Keys.Delete]),
	},
} as const;

export function createComboboxInput<TOption>({
	combobox,
}: CreateComboboxInputConfig<TOption>) {
	const { emitEvent, setInputValue } = combobox;
	let element = $state<HTMLInputElement>();
	let state: StateNode | undefined;

	function setup() {
		if (state) return;

		// TODO: validate event values in DEV mode
		state = node({
			on: {
				[inputEvent.input]() {
					emitEvent(rootEvent.clear.activeItem);
					if (!combobox.isOpen && element?.value.length) {
						emitEvent(rootEvent.open);
					}
				},
				[inputEvent.keydown.AltArrowDown](event: unknown) {
					emitEvent(rootEvent.open);
					cancelDOMEvent(event as Event);
				},
				[inputEvent.keydown.ArrowDown](event: Event) {
					if (combobox.isOpen) {
						emitEvent(rootEvent.set.nextItemActive);
					} else {
						emitEvent(rootEvent.open);
						emitEvent(rootEvent.set.firstItemActive);
					}
					cancelDOMEvent(event);
				},
				[inputEvent.keydown.AltArrowUp](event) {
					emitEvent(rootEvent.close);
					cancelDOMEvent(event as Event);
				},
				[inputEvent.keydown.ArrowUp](event: Event) {
					if (combobox.isOpen) {
						emitEvent(rootEvent.set.previousItemActive);
					} else {
						emitEvent(rootEvent.open);
						emitEvent(rootEvent.set.lastItemActive);
					}
					cancelDOMEvent(event);
				},
				[inputEvent.keydown.End]() {
					element?.setSelectionRange(
						element.value.length,
						element.value.length,
					);
				},
				[inputEvent.keydown.Enter](event: Event) {
					if (combobox.activeItem) {
						emitEvent(rootEvent.set.value, combobox.activeItem);
					}
					emitEvent(rootEvent.close);
					cancelDOMEvent(event);
				},
				[inputEvent.keydown.Escape](event: Event) {
					if (combobox.isOpen) {
						emitEvent(rootEvent.close);
					} else {
						emitEvent(rootEvent.clear.activeItem);
						if (element) {
							element.value = '';
						}
					}
					cancelDOMEvent(event);
				},
				[inputEvent.keydown.Home]() {
					element?.setSelectionRange(0, 0);
				},
				[inputEvent.keydown.Tab]() {
					if (combobox.activeItem) {
						emitEvent(rootEvent.set.value, combobox.activeItem);
					}
					emitEvent(rootEvent.close);
				},
				[inputEvent.keyup.Backspace](event: Event) {
					emitEvent(rootEvent.clear.activeItem);
					cancelDOMEvent(event);
				},
				[inputEvent.keyup.Delete](event: Event) {
					emitEvent(rootEvent.clear.activeItem);
					cancelDOMEvent(event);
				},
				[rootEvent.set.value](value: TOption) {
					if (element) {
						element.value = setInputValue?.(value) ?? (value as string);
					}
				},
			},
		});

		combobox.appendChild(state);
	}

	setup();

	function destroy() {
		if (!state) return;

		combobox.removeChild(state);
		clearChildren(state);
		state = undefined;
	}

	return {
		action(_element: HTMLInputElement) {
			element = _element;
			setup();

			return { destroy };
		},
		get element() {
			return element;
		},
		props: {
			get ['aria-autocomplete']() {
				return (
					{
						'00': 'none',
						'01': 'list',
						'10': 'inline',
						'11': 'both',
					} as const
				)[
					`${+Boolean(combobox.hasInputCompletion)}${+Boolean(
						combobox.filter,
					)}` as '00' | '01' | '10' | '11'
				];
			},
			get ['aria-controls']() {
				return combobox.ids.listbox;
			},
			get ['aria-expanded']() {
				return combobox.isOpen;
			},
			id: combobox.ids.input,
			onclick() {
				if (combobox.isOpen) {
					emitEvent(rootEvent.close);
				} else {
					emitEvent(rootEvent.open);
				}
			},
			oninput(event: Event) {
				emitEvent(inputEvent.input, event);
			},
			onkeydown(event: KeyboardEvent) {
				emitEvent(createInputEvent('keydown', keysFromEvent(event)), event);
			},
			onkeyup(event: KeyboardEvent) {
				emitEvent(createInputEvent('keyup', keysFromEvent(event)), event);
			},
			role: 'combobox',
			type: 'text' as const,
		},
	};
}
