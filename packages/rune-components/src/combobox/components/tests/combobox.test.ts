import type { ComboboxOption } from '../../runes/root.svelte.js';
import { describe, expect, test } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import { render } from './util.js';
import Combobox from './combobox.svelte';

describe('combobox', () => {
	interface Fruit extends ComboboxOption<string> {
		key: string;
	}

	const options: Fruit[] = [
		{ key: 'apple', value: 'Apple' },
		{ key: 'banana', value: 'Banana' },
		{ key: 'blueberry', value: 'Blueberry' },
		{ key: 'boysenberry', value: 'Boysenberry' },
		{ key: 'cherry', value: 'Cherry' },
	];

	interface RenderOptionsArgs {
		isOpen?: boolean;
		shouldFocus?: false;
		value?: Fruit;
	}

	async function renderScreen(props?: RenderOptionsArgs) {
		const { shouldFocus = true, ...restProps } = props ?? {};
		const screen = render(Combobox, { options, ...restProps });

		if (shouldFocus) {
			await userEvent.keyboard('[Tab]');
		}

		return {
			...screen,
			get button() {
				return screen.getByRole('button');
			},
			get combobox() {
				return screen.getByRole('combobox');
			},
			get listbox() {
				return screen.getByRole('listbox');
			},
			get focusedOption() {
				return screen.getByAttribute('data-active-item', 'true');
			},
			get selectedOption() {
				return screen.getByRole('option', { selected: true });
			},
			getOptionByName(name?: string) {
				return screen.getByRole('option', { name });
			},
		};
	}

	describe('Modifying props', () => {
		test('Setting the value updates the selected option', async () => {
			const {
				combobox,
				listbox,
				selectedOption,
				focusedOption,
				rerender,
			} = await renderScreen({
				isOpen: true,
				value: options[1], // init
			});
			await expect.element(combobox).toHaveValue(options[1]?.value);
			await expect.element(listbox).toBeInTheDocument();

			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[1]?.value);
			await expect
				.element(focusedOption)
				.toHaveAccessibleName(options[1]?.value);

			await rerender({ value: options[2] }); // update
			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[2]?.value);
			await expect
				.element(focusedOption)
				.toHaveAccessibleName(options[2]?.value);

			await rerender({ value: undefined }); // reset
			await expect(selectedOption.query()).not.toBeInTheDocument();
			await expect(focusedOption.query()).not.toBeInTheDocument();
		});
	});

	describe('When focus is not on the combobox', () => {
		test('Clicking the button opens the popup and focuses the input', async () => {
			const { button, combobox, listbox } = await renderScreen({
				shouldFocus: false,
			});
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect.element(combobox).not.toHaveFocus();

			await button.click();
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(combobox).toHaveFocus();
		});
	});

	describe('When focus is on the input', () => {
		test('ArrowDown opens popup and focuses first item when no value is selected', async () => {
			const { focusedOption, listbox } = await renderScreen();
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect(focusedOption.query()).not.toBeInTheDocument();

			await userEvent.keyboard('[ArrowDown]');
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(listbox).toBeVisible();
			await expect.element(focusedOption).toBeInTheDocument();
			await expect
				.element(focusedOption)
				.toHaveAccessibleName(options[0]?.value);
		});

		test('ArrowDown opens popup and focuses selected item', async () => {
			const { combobox, listbox, selectedOption } = await renderScreen({
				value: options[2],
			});
			await expect.element(combobox).toHaveValue(options[2]?.value);
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect(selectedOption.query()).not.toBeInTheDocument();

			await userEvent.keyboard('[ArrowDown]');
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(listbox).toBeVisible();
			await expect.element(selectedOption).toBeInTheDocument();
			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[2]?.value);
		});

		test('ArrowUp opens popup and places focus on the last focusable element', async () => {
			const { focusedOption, listbox } = await renderScreen();
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect(focusedOption.query()).not.toBeInTheDocument();

			await userEvent.keyboard('[ArrowUp]');
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(focusedOption).toBeInTheDocument();
			await expect
				.element(focusedOption)
				.toHaveAccessibleName(options[options.length - 1]?.value);
		});

		test('Alt+ArrowDown displays the popup without moving focus', async () => {
			const { combobox, focusedOption, listbox } = await renderScreen();
			await userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}');
			await expect.element(combobox).toHaveFocus();
			await expect.element(listbox).toBeInTheDocument();
			await expect(focusedOption.query()).not.toBeInTheDocument();
		});

		test('Escape clears combobox input', async () => {
			const { combobox } = await renderScreen({ value: options[1] });
			await expect.element(combobox).toHaveValue(options[1]?.value);

			await userEvent.keyboard('[Escape]');
			await expect.element(combobox).toHaveValue('');
		});
	});

	describe('When focus is on the listbox popup', () => {
		test('Enter accepts focused option', async () => {
			const { combobox, focusedOption, listbox } = await renderScreen();
			await userEvent.keyboard('[ArrowDown]');
			await expect
				.element(focusedOption)
				.toHaveAccessibleName(options[0]?.value);
			await expect.element(combobox).toHaveValue('');

			await userEvent.keyboard('[Enter]');
			await expect.element(combobox).toHaveValue(options[0]?.value);
			await expect.element(combobox).toHaveFocus();
			await expect(listbox.query()).not.toBeInTheDocument();
		});

		test('Escape closes the popup and returns focus to the combobox', async () => {
			const { combobox, listbox } = await renderScreen({
				value: options[1],
			});
			await expect.element(combobox).toHaveValue(options[1]?.value);

			await userEvent.keyboard('[ArrowDown]');
			await expect.element(listbox).toBeInTheDocument();

			await userEvent.keyboard('[Escape]');
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect.element(combobox).toHaveFocus();
			await expect.element(combobox).toHaveValue(options[1]?.value);
		});

		test('Closing the popup resets the input value to the selected option', async () => {
			const { combobox } = await renderScreen({
				isOpen: true,
				value: options[1],
			});
			await userEvent.keyboard('[Backspace]');
			await expect.element(combobox).toHaveValue('');

			await userEvent.keyboard('[Escape]');
			await expect.element(combobox).toHaveValue(options[1]?.value);
		});

		test('ArrowDown moves focus to the next element', async () => {
			const { focusedOption } = await renderScreen();
			await userEvent.keyboard('[ArrowDown]');
			await expect
				.element(focusedOption)
				.toHaveAccessibleName(options[0]?.value);

			await userEvent.keyboard('[ArrowDown]');
			await expect
				.element(focusedOption)
				.toHaveAccessibleName(options[1]?.value);
		});

		test('Alt+ArrowUp closes the popup and returns focus to the combobox', async () => {
			const { combobox, listbox } = await renderScreen({
				isOpen: true,
				value: options[1],
			});
			await expect.element(combobox).toHaveValue(options[1]?.value);
			await expect.element(listbox).toBeInTheDocument();

			await userEvent.keyboard('{Alt>}{ArrowUp}{/Alt}');
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect.element(combobox).toHaveFocus();
		});

		test('ArrowUp moves focus to the previous element when open', async () => {
			const { focusedOption } = await renderScreen();
			await userEvent.keyboard('[ArrowUp]');
			await expect
				.element(focusedOption)
				.toHaveAccessibleName(options[options.length - 1]?.value);

			await userEvent.keyboard('[ArrowUp]');
			await expect
				.element(focusedOption)
				.toHaveAccessibleName(options[options.length - 2]?.value);
		});

		test('Delete key returns focus to the combobox input', async () => {
			const { combobox, focusedOption, listbox } = await renderScreen();
			await userEvent.keyboard('[ArrowDown]');
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(focusedOption).toBeInTheDocument();

			await userEvent.keyboard('[Delete]');
			await expect.element(combobox).toHaveFocus();
			await expect.element(listbox).toBeInTheDocument();
			await expect(focusedOption.query()).not.toBeInTheDocument();
		});

		test('Backspace key returns focus to the combobox input', async () => {
			const { combobox, focusedOption, listbox } = await renderScreen();
			await userEvent.keyboard('[ArrowDown]');
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(focusedOption).toBeInTheDocument();

			await userEvent.keyboard('[Backspace]');
			await expect.element(combobox).toHaveFocus();
			await expect.element(listbox).toBeInTheDocument();
			await expect(focusedOption.query()).not.toBeInTheDocument();
		});

		test('Clicking listbox item sets input value and closes popup', async () => {
			const { combobox, getOptionByName, listbox } = await renderScreen({
				isOpen: true,
			});
			await expect.element(listbox).toBeInTheDocument();

			await userEvent.click(getOptionByName(options[1]?.value));
			await expect.element(combobox).toHaveValue(options[1]?.value);
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect.element(combobox).toHaveFocus();
		});
	});
});
