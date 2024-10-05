import { invariant } from '@svelte-thing/component-utils';
import { rootEvent, type ComboboxRoot } from './root.svelte.js';
import {
	cancelEvent as cancelDOMEvent,
	encodeKeys,
	Keys,
	keysFromEvent,
} from '@svelte-thing/dom-event';
import { StateNode } from '@svelte-thing/state-event';

export interface CreateComboboxInputConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
}

export type ComboboxInput = ReturnType<typeof createComboboxInput>;

export const INPUT_SET_VALUE = 'combobox.input.set.value';

export function createComboboxInput({ combobox }: CreateComboboxInputConfig) {
	const { setInputValue } = combobox;
	let element: HTMLInputElement | undefined;
	const state = new StateNode({
		on: {
			[INPUT_SET_VALUE](value) {
				invariant(
					typeof value === 'string',
					`"${INPUT_SET_VALUE}" expect string.`,
				);
				state.emitEvent(rootEvent.clear.activeItem, undefined);
				if (!combobox.isOpen && value.length) {
					state.emitEvent(rootEvent.open, undefined);
				}
			},
			[rootEvent.set.value](value) {
				if (element) {
					element.value = setInputValue?.(value) ?? (value as string);
				}
			},
		},
	});

	interface EventRecord {
		[k: string]: (event: KeyboardEvent) => void;
	}

	const keydownEvents: EventRecord = {
		[encodeKeys([Keys.Alt, Keys.ArrowDown])](event: unknown) {
			state.emitEvent(rootEvent.open, undefined);
			cancelDOMEvent(event as Event);
		},
		[encodeKeys([Keys.ArrowDown])](event: Event) {
			if (combobox.isOpen) {
				state.emitEvent(rootEvent.set.nextItemActive, undefined);
			} else {
				state.emitEvent(rootEvent.open, undefined);
				state.emitEvent(rootEvent.set.firstItemActive, undefined);
			}
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.Alt, Keys.ArrowUp])](event) {
			state.emitEvent(rootEvent.close, undefined);
			cancelDOMEvent(event as Event);
		},
		[encodeKeys([Keys.ArrowUp])](event: Event) {
			if (combobox.isOpen) {
				state.emitEvent(rootEvent.set.previousItemActive, undefined);
			} else {
				state.emitEvent(rootEvent.open, undefined);
				state.emitEvent(rootEvent.set.lastItemActive, undefined);
			}
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.End])]() {
			element?.setSelectionRange(element.value.length, element.value.length);
		},
		[encodeKeys([Keys.Enter])](event: Event) {
			if (combobox.activeItem) {
				state.emitEvent(rootEvent.set.value, combobox.activeItem);
			}
			state.emitEvent(rootEvent.close, undefined);
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.Escape])](event: Event) {
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
		[encodeKeys([Keys.Home])]() {
			element?.setSelectionRange(0, 0);
		},
		[encodeKeys([Keys.Tab])]() {
			if (combobox.activeItem) {
				state.emitEvent(rootEvent.set.value, combobox.activeItem);
			}
			state.emitEvent(rootEvent.close, undefined);
		},
	};

	const keyupEvents: EventRecord = {
		[encodeKeys([Keys.Backspace])](event: Event) {
			state.emitEvent(rootEvent.clear.activeItem, undefined);
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.Delete])](event: Event) {
			state.emitEvent(rootEvent.clear.activeItem, undefined);
			cancelDOMEvent(event);
		},
	};

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
				state.emitEvent(
					INPUT_SET_VALUE,
					(event as Event & { currentTarget: EventTarget & HTMLInputElement })
						.currentTarget.value,
				);
			},
			onkeydown(event: KeyboardEvent) {
				keydownEvents[encodeKeys(keysFromEvent(event))](event);
			},
			onkeyup(event: KeyboardEvent) {
				keyupEvents[encodeKeys(keysFromEvent(event))](event);
			},
			role: 'combobox',
			type: 'text' as const,
		},
	};
}
