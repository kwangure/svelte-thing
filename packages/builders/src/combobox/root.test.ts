import { beforeEach, describe, expect, it } from 'vitest';
import {
	createCombobox,
	rootEvent,
	type ComboboxBuilder,
} from './root.svelte.js';
import { createComboboxInput } from './input.svelte.js';
import { createListboxItem } from './listboxitem.svelte.js';

describe('combobox', () => {
	interface Fruit {
		name: string;
	}
	let combobox: ComboboxBuilder<Fruit>;
	let input: ReturnType<typeof createComboboxInput>;
	let listboxItems: Map<string, ReturnType<typeof createListboxItem>>;
	let options: Fruit[];
	let cleanup: (() => void)[];
	const setInputValue = (fruit: Fruit) => fruit?.name;
	beforeEach(() => {
		cleanup = [];
		options = [
			{ name: 'Apple' },
			{ name: 'Banana' },
			{ name: 'Blueberry' },
			{ name: 'Boysenberry' },
			{ name: 'Cherry' },
		];
		combobox = createCombobox({
			filter({ inputValue, options }) {
				return (
					options?.filter((option) =>
						option.name.toLowerCase().startsWith(inputValue.toLowerCase()),
					) ?? []
				);
			},
			label: 'Favorite Fruit',
			options,
			setInputValue,
		});
		cleanup.push(combobox.action(document.createElement('div')).destroy);

		input = createComboboxInput({ combobox });
		cleanup.push(input.action(document.createElement('input')).destroy);
		listboxItems = new Map();
		for (const option of options) {
			const item = createListboxItem({ combobox, value: option });
			listboxItems.set(option.name, item);
		}
	});

	describe('When focus is on the input', () => {
		it('ArrowDown opens popup and moves focus to first focusable element', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
			input.properties.onkeydown(event);
			expect(combobox.isOpen).toBe(true);
			expect(combobox.activeItem).toBe(options[0]);
			expect(combobox.visualFocus).toBe('listbox');
		});

		it('ArrowUp opens popup and places focus on the last focusable element', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
			input.properties.onkeydown(event);
			expect(combobox.isOpen).toBe(true);
			expect(combobox.activeItem).toBe(options.at(-1));
			expect(combobox.visualFocus).toBe('listbox');
		});

		it('Enter accepts the autocomplete suggestion if one is selected', () => {
			combobox.emitEvent(rootEvent.open);
			expect(combobox.visualFocus).toBe('input');
			const event = new KeyboardEvent('keydown', { key: 'Enter' });
			input.properties.onkeydown(event);
			expect(combobox.value).toBe(undefined);
			expect(combobox.isOpen).toBe(false);
			expect(combobox.visualFocus).toBe('input');
		});

		it('Alt+ArrowDown displays the popup without moving focus', () => {
			expect(combobox.visualFocus).toBe('input');
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowDown',
				altKey: true,
			});
			input.properties.onkeydown(event);
			expect(combobox.isOpen).toBe(true);
			expect(combobox.activeItem).toBeUndefined();
			expect(combobox.visualFocus).toBe('input');
		});

		it('Alt+ArrowUp closes the popup and returns focus to the combobox', () => {
			combobox.emitEvent(rootEvent.open);
			combobox.emitEvent(rootEvent.set.firstItemActive);
			expect(combobox.visualFocus).toBe('listbox');
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowUp',
				altKey: true,
			});
			input.properties.onkeydown(event);
			expect(combobox.isOpen).toBe(false);
			expect(combobox.visualFocus).toBe('input');
		});
	});

	describe('When focus is on the listbox popup', () => {
		beforeEach(() => {
			combobox.emitEvent(rootEvent.open);
			combobox.emitEvent(rootEvent.set.firstItemActive);
		});

		it('Enter accepts the focused option', () => {
			const event = new KeyboardEvent('keydown', { key: 'Enter' });
			input.properties.onkeydown(event);
			expect(combobox.value).toEqual(options[0]);
			expect(combobox.isOpen).toBe(false);
		});

		it('Escape closes the popup and returns focus to the combobox', () => {
			expect(combobox.visualFocus).toBe('listbox');
			const event = new KeyboardEvent('keydown', { key: 'Escape' });
			input.properties.onkeydown(event);
			expect(combobox.value).toBe(undefined);
			expect(combobox.isOpen).toBe(false);
			expect(combobox.visualFocus).toBe('input');
		});

		it('ArrowDown moves focus to and selects the next option', () => {
			const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
			input.properties.onkeydown(event);
			expect(combobox.activeItem).toBe(options[1]);
		});

		it('ArrowUp moves focus to and selects the previous option', () => {
			combobox.emitEvent(rootEvent.set.nextItemActive);
			expect(combobox.activeItem).toEqual(options[1]);
			const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
			input.properties.onkeydown(event);
			expect(combobox.activeItem).toEqual(options[0]);
		});

		it('Backspace returns focus to the combobox', () => {
			expect(combobox.visualFocus).toEqual('listbox');
			const backspaceEvent = new KeyboardEvent('keydown', {
				key: 'Backspace',
			});
			input.properties.onkeyup(backspaceEvent);
			expect(combobox.visualFocus).toEqual('input');
		});

		it('Delete returns focus to the combobox', () => {
			expect(combobox.visualFocus).toEqual('listbox');
			const deleteEvent = new KeyboardEvent('keydown', {
				key: 'Delete',
			});
			input.properties.onkeyup(deleteEvent);
			expect(combobox.visualFocus).toEqual('input');
		});

		it('Clicking listboxItem sets input and combobox value', () => {
			const clickedItem = options[1]; // Banana;

			listboxItems.get(clickedItem.name)?.properties.onclick();

			expect(input.element?.value).toEqual(setInputValue(clickedItem));
			expect(combobox.value).toEqual(clickedItem);
			expect(combobox.isOpen).toEqual(false);
			expect(combobox.visualFocus).toEqual('input');
		});
	});
});
