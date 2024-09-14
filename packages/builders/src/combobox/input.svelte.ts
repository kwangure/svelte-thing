import { ROOT, type ComboboxBuilder } from './root.svelte.js';
import { Keys, Mod, eventToKeys, cancelEvent } from '@svelte-thing/dom-event';
import { node } from '@svelte-thing/state-event';

export interface CreateComboboxInputConfig<TOption> {
	combobox: ComboboxBuilder<TOption>;
}

const createInputEvent = (...type: (string | number)[]) =>
	`input.${type.join('.')}`;

export const INPUT = {
	INPUT: createInputEvent('input'),
	KEYDOWN: {
		ALT_ARROW_DOWN: createInputEvent('keydown', Mod.Alt | Keys.ArrowDown),
		ARROW_DOWN: createInputEvent('keydown', Keys.ArrowDown),
		ALT_ARROW_UP: createInputEvent('keydown', Mod.Alt | Keys.ArrowUp),
		ARROW_UP: createInputEvent('keydown', Keys.ArrowUp),
		END: createInputEvent('keydown', Keys.End),
		ENTER: createInputEvent('keydown', Keys.Enter),
		ESC: createInputEvent('keydown', Keys.Escape),
		HOME: createInputEvent('keydown', Keys.Home),
		TAB: createInputEvent('keydown', Keys.Tab),
	},
	KEYUP: {
		BACKSPACE: createInputEvent('keyup', Keys.Backspace),
		DELETE: createInputEvent('keyup', Keys.Delete),
	},
} as const;

export function createComboboxInput<TOption>({
	combobox,
}: CreateComboboxInputConfig<TOption>) {
	const { setInputValue, operations } = combobox;
	let element = $state<HTMLInputElement>();

	// TODO: validate event values in DEV mode
	operations.appendChild(
		node({
			on: {
				[INPUT.INPUT]() {
					operations.clearActiveItem();
					if (!combobox.isOpen && element?.value.length) {
						operations.open();
					}
				},
				[INPUT.KEYDOWN.ALT_ARROW_DOWN](event: unknown) {
					operations.open();
					cancelEvent(event as Event);
				},
				[INPUT.KEYDOWN.ARROW_DOWN](event: Event) {
					if (combobox.isOpen) {
						operations.setNextActiveItem();
					} else {
						operations.openAndSetFirstItemActive();
					}
					cancelEvent(event);
				},
				[INPUT.KEYDOWN.ALT_ARROW_UP](event) {
					operations.close();
					cancelEvent(event as Event);
				},
				[INPUT.KEYDOWN.ARROW_UP](event: Event) {
					if (combobox.isOpen) {
						operations.setPreviousActiveItem();
					} else {
						operations.openAndSetLastItemActive();
					}
					cancelEvent(event);
				},
				[INPUT.KEYDOWN.END]() {
					element?.setSelectionRange(
						element.value.length,
						element.value.length,
					);
				},
				[INPUT.KEYDOWN.ENTER](event: Event) {
					if (combobox.activeItem) {
						operations.emitEvent(ROOT.SET.VALUE, combobox.activeItem);
					}
					operations.close();
					cancelEvent(event);
				},
				[INPUT.KEYDOWN.ESC](event: Event) {
					if (combobox.isOpen) {
						operations.close();
					} else {
						operations.clearActiveItem();
						if (element) {
							element.value = '';
						}
					}
					cancelEvent(event);
				},
				[INPUT.KEYDOWN.HOME]() {
					element?.setSelectionRange(0, 0);
				},
				[INPUT.KEYDOWN.TAB]() {
					if (combobox.activeItem) {
						operations.emitEvent(ROOT.SET.VALUE, combobox.activeItem);
					}
					operations.close();
				},
				[INPUT.KEYUP.BACKSPACE](event: Event) {
					operations.clearActiveItem();
					cancelEvent(event);
				},
				[INPUT.KEYUP.DELETE](event: Event) {
					operations.clearActiveItem();
					cancelEvent(event);
				},
				[ROOT.SET.VALUE](value: TOption) {
					if (element && setInputValue) {
						element.value = setInputValue(value);
					}
				},
			},
		}),
	);

	const properties = {
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
				operations.close();
			} else {
				operations.open();
			}
		},
		oninput(event: Event) {
			operations.emitEvent(INPUT.INPUT, event);
		},
		onkeydown(event: KeyboardEvent) {
			operations.emitEvent(
				createInputEvent('keydown', eventToKeys(event)),
				event,
			);
		},
		onkeyup(event: KeyboardEvent) {
			operations.emitEvent(
				createInputEvent('keyup', eventToKeys(event)),
				event,
			);
		},
		role: 'combobox',
		type: 'text' as const,
	};

	return {
		action(node: HTMLInputElement) {
			element = node;
		},
		get element() {
			return element;
		},
		properties,
	};
}
