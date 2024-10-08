import { beforeEach, describe, expect, it } from 'vitest';
import { createComboboxRoot, type ComboboxRoot } from './root.svelte.js';
import { createComboboxInput } from './input.svelte.js';
import { createListboxItem } from './listboxitem.svelte.js';

describe('combobox', () => {
	interface Fruit {
		name: string;
	}
	let combobox: ComboboxRoot<Fruit>;
	let input: ReturnType<typeof createComboboxInput>;
	let inputElement: HTMLInputElement;
	let listboxItems: Map<string, ReturnType<typeof createListboxItem>>;
	let options: Fruit[];
	let cleanup: (() => void)[];
	const optionToString = (fruit: Fruit) => fruit?.name;
	beforeEach(() => {
		cleanup = [];
		options = [
			{ name: 'Apple' },
			{ name: 'Banana' },
			{ name: 'Blueberry' },
			{ name: 'Boysenberry' },
			{ name: 'Cherry' },
		];
		combobox = createComboboxRoot({
			filter({ inputValue, options }) {
				return (
					options?.filter((option) =>
						option.name
							.toLowerCase()
							.startsWith(inputValue.toLowerCase()),
					) ?? []
				);
			},
			label: 'Favorite Fruit',
			options,
			optionToString,
		});
		cleanup.push(combobox.action(document.createElement('div')).destroy);

		input = createComboboxInput({ combobox });
		inputElement = document.createElement('input');
		cleanup.push(input.action(inputElement).destroy);
		listboxItems = new Map();
		for (const option of options) {
			const item = createListboxItem({ combobox, item: option });
			listboxItems.set(option.name, item);
		}
	});

	describe('When focus is on the input', () => {
		it('ArrowDown opens popup and moves focus to first focusable element', () => {
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowDown',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.isOpen).toBe(true);
			expect(combobox.activeItem).toBe(options[0]);
			expect(combobox.visualFocus).toBe('listbox');
		});

		it('ArrowDown when open moves focus to the next element', () => {
			combobox.open();
			expect(combobox.visualFocus).toBe('input');
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowDown',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.visualFocus).toBe('listbox');
			expect(combobox.activeItem).toBe(options.at(0));
			input.props.onkeydown(event);
			expect(combobox.visualFocus).toBe('listbox');
			expect(combobox.activeItem).toBe(options.at(1));
		});

		it('ArrowUp opens popup and places focus on the last focusable element', () => {
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowUp',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.isOpen).toBe(true);
			expect(combobox.activeItem).toBe(options.at(-1));
			expect(combobox.visualFocus).toBe('listbox');
		});

		it('ArrowUp when open moves focus to the previous element', () => {
			combobox.open();
			expect(combobox.visualFocus).toBe('input');
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowUp',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.visualFocus).toBe('listbox');
			expect(combobox.activeItem).toBe(options.at(-1));
			input.props.onkeydown(event);
			expect(combobox.visualFocus).toBe('listbox');
			expect(combobox.activeItem).toBe(options.at(-2));
		});

		it('Enter accepts the autocomplete suggestion if one is selected', () => {
			combobox.open();
			expect(combobox.visualFocus).toBe('input');
			const event = new KeyboardEvent('keydown', {
				key: 'Enter',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.value).toBe(undefined);
			expect(combobox.isOpen).toBe(false);
			expect(combobox.visualFocus).toBe('input');
		});

		it('Alt+ArrowDown displays the popup without moving focus', () => {
			expect(combobox.visualFocus).toBe('input');
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowDown',
				altKey: true,
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.isOpen).toBe(true);
			expect(combobox.activeItem).toBeUndefined();
			expect(combobox.visualFocus).toBe('input');
		});

		it('Alt+ArrowUp closes the popup and returns focus to the combobox', () => {
			combobox.open();
			combobox.setFirstItemActive();
			expect(combobox.visualFocus).toBe('listbox');
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowUp',
				altKey: true,
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.isOpen).toBe(false);
			expect(combobox.visualFocus).toBe('input');
		});
	});

	describe('When focus is on the listbox popup', () => {
		beforeEach(() => {
			combobox.open();
			combobox.setFirstItemActive();
		});

		it('Enter accepts the focused option', () => {
			const event = new KeyboardEvent('keydown', {
				key: 'Enter',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.value).toEqual(options[0]);
			expect(combobox.isOpen).toBe(false);
		});

		it('Escape closes the popup and returns focus to the combobox', () => {
			expect(combobox.visualFocus).toBe('listbox');
			const event = new KeyboardEvent('keydown', {
				key: 'Escape',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.value).toBe(undefined);
			expect(combobox.isOpen).toBe(false);
			expect(combobox.visualFocus).toBe('input');
		});

		it('ArrowDown moves focus to and selects the next option', () => {
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowDown',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.activeItem).toBe(options[1]);
		});

		it('ArrowUp moves focus to and selects the previous option', () => {
			combobox.setNextItemActive();
			expect(combobox.activeItem).toEqual(options[1]);
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowUp',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeydown(event);
			expect(combobox.activeItem).toEqual(options[0]);
		});

		it('Backspace returns focus to the combobox', () => {
			expect(combobox.visualFocus).toEqual('listbox');
			const event = new KeyboardEvent('keyup', {
				key: 'Backspace',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeyup(event);
			expect(combobox.visualFocus).toEqual('input');
		});

		it('Delete returns focus to the combobox', () => {
			expect(combobox.visualFocus).toEqual('listbox');
			const event = new KeyboardEvent('keyup', {
				key: 'Delete',
			}) as KeyboardEvent & {
				currentTarget: EventTarget & HTMLInputElement;
			};
			input.props.onkeyup(event);
			expect(combobox.visualFocus).toEqual('input');
		});

		it('Clicking listboxItem sets input and combobox value', () => {
			const clickedItem = options[1]!; // Banana;

			listboxItems.get(clickedItem.name)?.props.onclick();

			expect(inputElement.value).toEqual(optionToString(clickedItem));
			expect(combobox.value).toEqual(clickedItem);
			expect(combobox.isOpen).toEqual(false);
			expect(combobox.visualFocus).toEqual('input');
		});
	});
});
