import { type ComboboxRoot } from './root.svelte.js';
import {
	cancelEvent as cancelDOMEvent,
	encodeKeys,
	Keys,
	keysFromEvent,
} from '@svelte-thing/dom-event';

export interface CreateComboboxInputConfig {
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	combobox: ComboboxRoot<any>;
}

export type ComboboxInput = ReturnType<typeof createComboboxInput>;

export const INPUT_SET_VALUE = 'combobox.input.set.value';

export function createComboboxInput({ combobox }: CreateComboboxInputConfig) {
	let element: HTMLInputElement | undefined;

	combobox.onSetInputValue((value) => {
		combobox.clearActiveItem();
		if (!combobox.isOpen && value.length) {
			combobox.open();
		}
	});

	combobox.onSetValue((value) => {
		if (element) {
			element.value = combobox.optionToString?.(value) ?? (value as string);
		}
	});

	interface EventRecord {
		[k: string]: (event: KeyboardEvent) => void;
	}

	const keydownEvents: EventRecord = {
		[encodeKeys([Keys.Alt, Keys.ArrowDown])](event: unknown) {
			combobox.open();
			cancelDOMEvent(event as Event);
		},
		[encodeKeys([Keys.ArrowDown])](event: Event) {
			if (combobox.isOpen) {
				combobox.setNextItemActive();
			} else {
				combobox.open();
				combobox.setFirstItemActive();
			}
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.Alt, Keys.ArrowUp])](event) {
			combobox.close();
			cancelDOMEvent(event as Event);
		},
		[encodeKeys([Keys.ArrowUp])](event: Event) {
			if (combobox.isOpen) {
				combobox.setPreviousItemActive();
			} else {
				combobox.open();
				combobox.setLastItemActive();
			}
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.End])]() {
			element?.setSelectionRange(element.value.length, element.value.length);
		},
		[encodeKeys([Keys.Enter])](event: Event) {
			if (combobox.activeItem) {
				combobox.setValue(combobox.activeItem);
			}
			combobox.close();
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.Escape])](event: Event) {
			if (combobox.isOpen) {
				combobox.close();
			} else {
				combobox.clearActiveItem();
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
				combobox.setValue(combobox.activeItem);
			}
			combobox.close();
		},
	};

	const keyupEvents: EventRecord = {
		[encodeKeys([Keys.Backspace])](event: Event) {
			combobox.clearActiveItem();
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.Delete])](event: Event) {
			combobox.clearActiveItem();
			cancelDOMEvent(event);
		},
	};

	return {
		action(_element: HTMLInputElement) {
			element = _element;

			return {
				destroy() {
					element = undefined;
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
					combobox.close();
				} else {
					combobox.open();
				}
			},
			oninput(event: Event) {
				combobox.setInputValue(
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
