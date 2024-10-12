import type { SvelteComponent } from 'svelte';
import { beforeEach, describe, expect, test } from 'vitest';
import { render, type RenderResult } from 'vitest-browser-svelte';
import { userEvent, type Locator } from '@vitest/browser/context';

import Combobox from './combobox.svelte';

describe('combobox', () => {
	interface Fruit {
		name: string;
	}

	const options: Fruit[] = [
		{ name: 'Apple' },
		{ name: 'Banana' },
		{ name: 'Blueberry' },
		{ name: 'Boysenberry' },
		{ name: 'Cherry' },
	];

	let combobox: Locator;
	let listbox: Locator;
	let selectedOption: Locator;
	let screen: RenderResult<
		SvelteComponent<{ isOpen: boolean; options: Fruit[]; value: Fruit }>
	>;

	beforeEach(async () => {
		// @ts-expect-error Svelte 4 types
		screen = render(Combobox, { options });
		combobox = screen.getByRole('combobox');
		listbox = screen.getByRole('listbox');
		selectedOption = screen.getByRole('option', {
			selected: true,
		});
		await expect.element(combobox).not.toHaveFocus();

		await userEvent.keyboard('[Tab]');
		await expect.element(combobox).toHaveFocus();
	});

	describe('When focus is on the input', () => {
		test('ArrowDown opens popup and moves focus to first focusable element', async () => {
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect(selectedOption.query()).not.toBeInTheDocument();

			await userEvent.keyboard('[ArrowDown]');
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(listbox).toBeVisible();
			await expect.element(selectedOption).toBeInTheDocument();
			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[0]?.name);
		});

		test('ArrowUp opens popup and places focus on the last focusable element', async () => {
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect(selectedOption.query()).not.toBeInTheDocument();

			await userEvent.keyboard('[ArrowUp]');
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(selectedOption).toBeInTheDocument();
			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[options.length - 1]?.name);
		});

		test('Alt+ArrowDown displays the popup without moving focus', async () => {
			await userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}');
			await expect.element(combobox).toHaveFocus();
			await expect.element(listbox).toBeInTheDocument();
			await expect(selectedOption.query()).not.toBeInTheDocument();
		});

		test('Escape clears combobox input', async () => {
			await screen.rerender({ options, value: options[1] });
			await expect.element(combobox).toHaveValue(options[1]?.name);

			await userEvent.keyboard('[Escape]');
			await expect.element(combobox).toHaveValue('');
		});
	});

	describe('When focus is on the listbox popup', () => {
		test('Enter accepts focused option', async () => {
			await userEvent.keyboard('[ArrowDown]');
			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[0]?.name);
			await expect.element(combobox).toHaveValue('');

			await userEvent.keyboard('[Enter]');
			await expect.element(combobox).toHaveValue(options[0]?.name);
			await expect.element(combobox).toHaveFocus();
			await expect(listbox.query()).not.toBeInTheDocument();
		});

		test('Escape closes the popup and returns focus to the combobox', async () => {
			await screen.rerender({ options, value: options[1] });
			await expect.element(combobox).toHaveValue(options[1]?.name);

			await userEvent.keyboard('[ArrowDown]');
			await expect.element(listbox).toBeInTheDocument();

			await userEvent.keyboard('[Escape]');
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect.element(combobox).toHaveFocus();
			await expect.element(combobox).toHaveValue(options[1]?.name);
		});

		test('ArrowDown moves focus to the next element', async () => {
			await userEvent.keyboard('[ArrowDown]');
			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[0]?.name);

			await userEvent.keyboard('[ArrowDown]');
			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[1]?.name);
		});

		test('Alt+ArrowUp closes the popup and returns focus to the combobox', async () => {
			await screen.rerender({ isOpen: true, options, value: options[1] });
			await expect.element(combobox).toHaveValue(options[1]?.name);
			await expect.element(listbox).toBeInTheDocument();

			await userEvent.keyboard('{Alt>}{ArrowUp}{/Alt}');
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect.element(combobox).toHaveFocus();
		});

		test('ArrowUp moves focus to the previous element when open', async () => {
			await userEvent.keyboard('[ArrowUp]');
			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[options.length - 1]?.name);

			await userEvent.keyboard('[ArrowUp]');
			await expect
				.element(selectedOption)
				.toHaveAccessibleName(options[options.length - 2]?.name);
		});

		test('Delete key returns focus to the combobox input', async () => {
			await userEvent.keyboard('[ArrowDown]');
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(selectedOption).toBeInTheDocument();

			await userEvent.keyboard('[Delete]');
			await expect.element(combobox).toHaveFocus();
			await expect.element(listbox).toBeInTheDocument();
			await expect(selectedOption.query()).not.toBeInTheDocument();
		});

		test('Backspace key returns focus to the combobox input', async () => {
			await userEvent.keyboard('[ArrowDown]');
			await expect.element(listbox).toBeInTheDocument();
			await expect.element(selectedOption).toBeInTheDocument();

			await userEvent.keyboard('[Backspace]');
			await expect.element(combobox).toHaveFocus();
			await expect.element(listbox).toBeInTheDocument();
			await expect(selectedOption.query()).not.toBeInTheDocument();
		});

		test('Clicking listbox item sets input value and closes popup', async () => {
			await screen.rerender({ isOpen: true, options });
			await expect.element(listbox).toBeInTheDocument();

			await userEvent.click(
				screen.getByRole('option', { name: options[1]?.name }),
			);
			await expect.element(combobox).toHaveValue(options[1]?.name);
			await expect(listbox.query()).not.toBeInTheDocument();
			await expect.element(combobox).toHaveFocus();
		});
	});
});