import type { ComboboxRoot } from './root.svelte.js';
import {
	cancelEvent as cancelDOMEvent,
	encodeKeys,
	Keys,
	keysFromEvent,
} from '@svelte-thing/dom-event';
import type { RuneComponent } from '../types.js';

export interface CreateComboboxInputConfig<TOption> {
	combobox: ComboboxRoot<TOption>;
}

export type ComboboxInput = ReturnType<typeof createComboboxInput>;

export function createComboboxInput<TOption>({
	combobox,
}: CreateComboboxInputConfig<TOption>) {
	interface EventRecord {
		[k: string]: (
			event: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement },
		) => void;
	}

	const keydownEvents: EventRecord = {
		[encodeKeys([Keys.Alt, Keys.ArrowDown])](event) {
			combobox.open();
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.ArrowDown])](event) {
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
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.ArrowUp])](event) {
			if (combobox.isOpen) {
				combobox.setPreviousItemActive();
			} else {
				combobox.open();
				combobox.setLastItemActive();
			}
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.End])](event) {
			const element = event.currentTarget;
			const length = element.value.length;
			element.setSelectionRange(length, length);
		},
		[encodeKeys([Keys.Enter])](event) {
			if (combobox.activeItem) {
				combobox.setValue(combobox.activeItem);
			}
			combobox.close();
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.Escape])](event) {
			if (combobox.isOpen) {
				combobox.close();
			} else {
				combobox.clearActiveItem();
				event.currentTarget.value = '';
			}
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.Home])](event) {
			event.currentTarget.setSelectionRange(0, 0);
		},
		[encodeKeys([Keys.Tab])]() {
			if (combobox.activeItem) {
				combobox.setValue(combobox.activeItem);
			}
			combobox.close();
		},
	};

	const keyupEvents: EventRecord = {
		[encodeKeys([Keys.Backspace])](event) {
			combobox.clearActiveItem();
			cancelDOMEvent(event);
		},
		[encodeKeys([Keys.Delete])](event) {
			combobox.clearActiveItem();
			cancelDOMEvent(event);
		},
	};

	return {
		action(element) {
			const unsub1 = combobox.onSetInputValue((value) => {
				combobox.clearActiveItem();
				if (!combobox.isOpen && value.length) {
					combobox.open();
				}
			});

			const unsub2 = combobox.onSetValue((value) => {
				element.value = combobox.optionToString?.(value) ?? (value as string);
			});

			return {
				destroy() {
					unsub1();
					unsub2();
				},
			};
		},
		props: {
			'data-st-combobox-input': '',
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
			oninput(event) {
				combobox.setInputValue(event.currentTarget.value);
			},
			onkeydown(event) {
				keydownEvents[encodeKeys(keysFromEvent(event))](event);
			},
			onkeyup(event) {
				keyupEvents[encodeKeys(keysFromEvent(event))](event);
			},
			role: 'combobox',
			type: 'text',
		},
	} satisfies RuneComponent<'input'>;
}
