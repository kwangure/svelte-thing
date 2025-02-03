import type { TRoot } from '../root/root.svelte.js';
import {
	cancelEvent,
	encodeKeys,
	Keys,
	keysFromEvent,
} from '@svelte-thing/dom-event';
import type { RuneComponent } from '../../types.js';

export interface CreateInputConfig<TValue> {
	root: TRoot<TValue>;
}

export type TInput = ReturnType<typeof createInput>;

export function createInput<TValue>({ root }: CreateInputConfig<TValue>) {
	type EventRecord = Record<
		string,
		(
			event: KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			},
		) => void
	>;

	const keydownEvents: EventRecord = {
		[encodeKeys([Keys.Alt, Keys.ArrowDown])](event) {
			root.open();
			cancelEvent(event);
		},
		[encodeKeys([Keys.ArrowDown])](event) {
			if (root.isOpen) {
				root.setNextItemActive();
			} else {
				root.open();
				if (!root.activeItem) {
					root.setNextItemActive();
				}
			}
			cancelEvent(event);
		},
		[encodeKeys([Keys.Alt, Keys.ArrowUp])](event) {
			root.close();
			cancelEvent(event);
		},
		[encodeKeys([Keys.ArrowUp])](event) {
			if (root.isOpen) {
				root.setPreviousItemActive();
			} else {
				root.open();
				if (!root.activeItem) {
					root.setPreviousItemActive();
				}
			}
			cancelEvent(event);
		},
		[encodeKeys([Keys.End])](event) {
			const element = event.currentTarget;
			const length = element.value.length;
			element.setSelectionRange(length, length);
		},
		[encodeKeys([Keys.Enter])](event) {
			if (root.activeItem) {
				root.setValue(root.activeItem);
			}
			root.close();
			cancelEvent(event);
		},
		[encodeKeys([Keys.Escape])](event) {
			if (root.isOpen) {
				root.close();
			} else {
				root.clearActiveItem();
				event.currentTarget.value = '';
			}
			cancelEvent(event);
		},
		[encodeKeys([Keys.Home])](event) {
			event.currentTarget.setSelectionRange(0, 0);
		},
		[encodeKeys([Keys.Tab])]() {
			if (root.activeItem) {
				root.setValue(root.activeItem);
			}
			root.close();
		},
	};

	const keyupEvents: EventRecord = {
		[encodeKeys([Keys.Backspace])](event) {
			root.clearActiveItem();
			cancelEvent(event);
		},
		[encodeKeys([Keys.Delete])](event) {
			root.clearActiveItem();
			cancelEvent(event);
		},
	};

	return {
		action(element) {
			const unsub1 = root.onSetIsOpen((isOpen) => {
				if (isOpen) {
					element.focus();
				} else {
					const string = root.valueToString();
					if (element.value !== string) {
						element.value = string;
					}
				}
			});
			const unsub2 = root.onSetValue(() => element.focus());

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
					`${+root.hasInputCompletion}${+root.hasFiltering}` as
						| '00'
						| '01'
						| '10'
						| '11'
				];
			},
			get ['aria-controls']() {
				return root.ids.listbox;
			},
			get ['aria-expanded']() {
				return root.isOpen;
			},
			get value() {
				return root.valueToString();
			},
			id: root.ids.input,
			onclick() {
				if (root.isOpen) {
					root.close();
				} else {
					root.open();
				}
			},
			oninput(event) {
				const { value } = event.currentTarget;
				root.clearActiveItem();
				if (!root.isOpen && value.length) {
					root.open();
				}
				root.setInputValue(value);
			},
			onkeydown(event) {
				keydownEvents[encodeKeys(keysFromEvent(event))]?.(event);
			},
			onkeyup(event) {
				keyupEvents[encodeKeys(keysFromEvent(event))]?.(event);
			},
			role: 'combobox',
			type: 'text',
		},
	} satisfies RuneComponent<'input'>;
}
