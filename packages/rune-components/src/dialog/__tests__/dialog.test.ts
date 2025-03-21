import { describe } from 'vitest';
import { render } from '../../testing/util.js';
import { expect, test } from 'vitest';
import { userEvent } from '@vitest/browser/context';
import Dialog from './Dialog.svelte';

describe('dialog', () => {
	interface RenderOptionsArgs {
		isOpen?: boolean;
	}

	function renderScreen(props?: RenderOptionsArgs) {
		const screen = render(Dialog, props);

		return Promise.resolve({
			...screen,
			get dialog() {
				return screen.getByAttribute('data-st-dialog-popup', '');
			},
		});
	}

	describe('Initialization', () => {
		test('dialog has correct default attributes', async () => {
			const { dialog } = await renderScreen();
			await expect.element(dialog).toHaveAttribute('aria-hidden');
			await expect.element(dialog).toHaveAttribute('inert');
			await expect.element(dialog).toHaveAttribute('data-st-modal');
			await expect.element(dialog).not.toHaveAttribute('open');
		});

		test('dialog has correct attributes when open', async () => {
			const { dialog } = await renderScreen({ isOpen: true });
			await expect.element(dialog).not.toHaveAttribute('aria-hidden');
			await expect.element(dialog).not.toHaveAttribute('inert');
			await expect.element(dialog).toHaveAttribute('open');
		});
	});

	describe('Click behavior', () => {
		test('clicking inside does not close dialog', async () => {
			const { dialog, getByText } = await renderScreen({ isOpen: true });
			await expect.element(dialog).toHaveAttribute('open');

			// Click the content inside the dialog
			const content = getByText('Lorem ipsum');
			await userEvent.click(content);
			await expect.element(dialog).toHaveAttribute('open');
		});
	});

	describe('State management', () => {
		test('close event updates internal state', async () => {
			const { dialog, rerender } = await renderScreen({ isOpen: true });
			await expect.element(dialog).toHaveAttribute('open');

			// Trigger close through prop update
			await rerender({ isOpen: false });
			await expect.element(dialog).toHaveAttribute('aria-hidden');
			await expect.element(dialog).toHaveAttribute('inert');
			await expect.element(dialog).not.toHaveAttribute('open');
		});
	});
});
