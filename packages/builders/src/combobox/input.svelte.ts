import { rootEvent, type ComboboxBuilder } from './root.svelte.js';
import { Keys, Mod, eventToKeys, cancelEvent } from '@svelte-thing/dom-event';
import { clearChildren, node, type StateNode } from '@svelte-thing/state-event';

export interface CreateComboboxInputConfig<TOption> {
	combobox: ComboboxBuilder<TOption>;
}

const createInputEvent = (...type: (string | number)[]) =>
	`input.${type.join('.')}`;

export const inputEvent = {
	input: createInputEvent('input'),
	keydown: {
		AltArrowDown: createInputEvent('keydown', Mod.Alt | Keys.ArrowDown),
		ArrowDown: createInputEvent('keydown', Keys.ArrowDown),
		AltArrowUp: createInputEvent('keydown', Mod.Alt | Keys.ArrowUp),
		ArrowUp: createInputEvent('keydown', Keys.ArrowUp),
		End: createInputEvent('keydown', Keys.End),
		Enter: createInputEvent('keydown', Keys.Enter),
		Escape: createInputEvent('keydown', Keys.Escape),
		Home: createInputEvent('keydown', Keys.Home),
		Tab: createInputEvent('keydown', Keys.Tab),
	},
	keyup: {
		Backspace: createInputEvent('keyup', Keys.Backspace),
		Delete: createInputEvent('keyup', Keys.Delete),
	},
} as const;

export function createComboboxInput<TOption>({
	combobox,
}: CreateComboboxInputConfig<TOption>) {
	const { setInputValue, operations } = combobox;
	let element = $state<HTMLInputElement>();
	let state: StateNode | undefined;

	return {
		action(_element: HTMLInputElement) {
			element = _element;
			// TODO: validate event values in DEV mode
			state = node({
				on: {
					[inputEvent.input]() {
						operations.emitEvent(rootEvent.clear.activeItem);
						if (!combobox.isOpen && element?.value.length) {
							operations.emitEvent(rootEvent.open);
						}
					},
					[inputEvent.keydown.AltArrowDown](event: unknown) {
						operations.emitEvent(rootEvent.open);
						cancelEvent(event as Event);
					},
					[inputEvent.keydown.ArrowDown](event: Event) {
						if (combobox.isOpen) {
							operations.emitEvent(rootEvent.set.nextItemActive);
						} else {
							operations.emitEvent(rootEvent.open);
							operations.emitEvent(rootEvent.set.firstItemActive);
						}
						cancelEvent(event);
					},
					[inputEvent.keydown.AltArrowUp](event) {
						operations.emitEvent(rootEvent.close);
						cancelEvent(event as Event);
					},
					[inputEvent.keydown.ArrowUp](event: Event) {
						if (combobox.isOpen) {
							operations.emitEvent(rootEvent.set.previousItemActive);
						} else {
							operations.emitEvent(rootEvent.open);
							operations.emitEvent(rootEvent.set.lastItemActive);
						}
						cancelEvent(event);
					},
					[inputEvent.keydown.End]() {
						element?.setSelectionRange(
							element.value.length,
							element.value.length,
						);
					},
					[inputEvent.keydown.Enter](event: Event) {
						if (combobox.activeItem) {
							operations.emitEvent(rootEvent.set.value, combobox.activeItem);
						}
						operations.emitEvent(rootEvent.close);
						cancelEvent(event);
					},
					[inputEvent.keydown.Escape](event: Event) {
						if (combobox.isOpen) {
							operations.emitEvent(rootEvent.close);
						} else {
							operations.emitEvent(rootEvent.clear.activeItem);
							if (element) {
								element.value = '';
							}
						}
						cancelEvent(event);
					},
					[inputEvent.keydown.Home]() {
						element?.setSelectionRange(0, 0);
					},
					[inputEvent.keydown.Tab]() {
						if (combobox.activeItem) {
							operations.emitEvent(rootEvent.set.value, combobox.activeItem);
						}
						operations.emitEvent(rootEvent.close);
					},
					[inputEvent.keyup.Backspace](event: Event) {
						operations.emitEvent(rootEvent.clear.activeItem);
						cancelEvent(event);
					},
					[inputEvent.keyup.Delete](event: Event) {
						operations.emitEvent(rootEvent.clear.activeItem);
						cancelEvent(event);
					},
					[rootEvent.set.value](value: TOption) {
						if (element && setInputValue) {
							element.value = setInputValue(value);
						}
					},
				},
			});

			operations.appendChild(state);

			return {
				destroy() {
					if (state) {
						operations.removeChild(state);
						clearChildren(state);
						state = undefined;
					}
				},
			};
		},
		get element() {
			return element;
		},
		properties: {
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
					operations.emitEvent(rootEvent.close);
				} else {
					operations.emitEvent(rootEvent.open);
				}
			},
			oninput(event: Event) {
				operations.emitEvent(inputEvent.input, event);
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
		},
	};
}
