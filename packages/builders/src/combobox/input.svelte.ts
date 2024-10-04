import { rootEvent, type ComboboxRoot } from './root.svelte.js';
import {
	cancelEvent as cancelDOMEvent,
	encodeKeys,
	Keys,
	type KeyCode,
	keysFromEvent,
} from '@svelte-thing/dom-event';
import { StateNode } from '@svelte-thing/state-event';

export interface CreateComboboxInputConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
}

export type ComboboxInput = ReturnType<typeof createComboboxInput>;

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

export function createComboboxInput({ combobox }: CreateComboboxInputConfig) {
	const { setInputValue } = combobox;
	let element: HTMLInputElement | undefined;
	const state = new StateNode({
		on: {
			[inputEvent.input]() {
				state.emitEvent(rootEvent.clear.activeItem, undefined);
				if (!combobox.isOpen && element?.value.length) {
					state.emitEvent(rootEvent.open, undefined);
				}
			},
			[inputEvent.keydown.AltArrowDown](event: unknown) {
				state.emitEvent(rootEvent.open, undefined);
				cancelDOMEvent(event as Event);
			},
			[inputEvent.keydown.ArrowDown](event: Event) {
				if (combobox.isOpen) {
					state.emitEvent(rootEvent.set.nextItemActive, undefined);
				} else {
					state.emitEvent(rootEvent.open, undefined);
					state.emitEvent(rootEvent.set.firstItemActive, undefined);
				}
				cancelDOMEvent(event);
			},
			[inputEvent.keydown.AltArrowUp](event) {
				state.emitEvent(rootEvent.close, undefined);
				cancelDOMEvent(event as Event);
			},
			[inputEvent.keydown.ArrowUp](event: Event) {
				if (combobox.isOpen) {
					state.emitEvent(rootEvent.set.previousItemActive, undefined);
				} else {
					state.emitEvent(rootEvent.open, undefined);
					state.emitEvent(rootEvent.set.lastItemActive, undefined);
				}
				cancelDOMEvent(event);
			},
			[inputEvent.keydown.End]() {
				element?.setSelectionRange(element.value.length, element.value.length);
			},
			[inputEvent.keydown.Enter](event: Event) {
				if (combobox.activeItem) {
					state.emitEvent(rootEvent.set.value, combobox.activeItem);
				}
				state.emitEvent(rootEvent.close, undefined);
				cancelDOMEvent(event);
			},
			[inputEvent.keydown.Escape](event: Event) {
				if (combobox.isOpen) {
					state.emitEvent(rootEvent.close, undefined);
				} else {
					state.emitEvent(rootEvent.clear.activeItem, undefined);
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
					state.emitEvent(rootEvent.set.value, combobox.activeItem);
				}
				state.emitEvent(rootEvent.close, undefined);
			},
			[inputEvent.keyup.Backspace](event: Event) {
				state.emitEvent(rootEvent.clear.activeItem, undefined);
				cancelDOMEvent(event);
			},
			[inputEvent.keyup.Delete](event: Event) {
				state.emitEvent(rootEvent.clear.activeItem, undefined);
				cancelDOMEvent(event);
			},
			[rootEvent.set.value](value: unknown) {
				if (element) {
					element.value = setInputValue?.(value) ?? (value as string);
				}
			},
		},
	});

	return {
		action(_element: HTMLInputElement) {
			element = _element;
			combobox.appendChild(state);

			return {
				destroy() {
					element = undefined;
					combobox.removeChild(state);
				},
			};
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
					state.emitEvent(rootEvent.close, undefined);
				} else {
					state.emitEvent(rootEvent.open, undefined);
				}
			},
			oninput(event: Event) {
				state.emitEvent(inputEvent.input, event);
			},
			onkeydown(event: KeyboardEvent) {
				state.emitEvent(
					createInputEvent('keydown', keysFromEvent(event)),
					event,
				);
			},
			onkeyup(event: KeyboardEvent) {
				state.emitEvent(createInputEvent('keyup', keysFromEvent(event)), event);
			},
			role: 'combobox',
			type: 'text' as const,
		},
	};
}
