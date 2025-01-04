import { describe } from 'vitest';
import { render } from '../../../testing/util.js';
import Dialog from './dialog.svelte';
import { expect, test } from 'vitest';
import { userEvent } from '@vitest/browser/context';

describe('dialog', () => {
	interface RenderOptionsArgs {
		isOpen?: boolean;
		isModal?: boolean;
		hideOnInteractOutside?: boolean;
	}

	function renderScreen(props?: RenderOptionsArgs) {
		const screen = render(Dialog, props);

		return Promise.resolve({
			...screen,
			get dialog() {
				return screen.getByAttribute('data-st-dialog-root', '');
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

	describe('Modal behavior', () => {
		test('dialog has modal attribute when isModal is true', async () => {
			const { dialog } = await renderScreen({ isModal: true });
			await expect.element(dialog).toHaveAttribute('data-st-modal');
		});

		test('dialog does not have modal attribute when isModal is false', async () => {
			const { dialog } = await renderScreen({ isModal: false });
			await expect.element(dialog).not.toHaveAttribute('data-st-modal');
		});
	});

	describe('Click outside behavior', () => {
		test('clicking outside non-modal dialog closes it by default', async () => {
			const { dialog, baseElement } = await renderScreen({
				isOpen: true,
			});
			await expect.element(dialog).toHaveAttribute('open');

			await userEvent.click(baseElement, { position: { x: 0, y: 0 } });
			await expect.element(dialog).not.toHaveAttribute('open');
		});

		test('clicking inside does not close dialog', async () => {
			const { dialog, getByText } = await renderScreen({ isOpen: true });
			await expect.element(dialog).toHaveAttribute('open');

			// Click the content inside the dialog
			const content = getByText('Lorem ipsum');
			await userEvent.click(content);
			await expect.element(dialog).toHaveAttribute('open');
		});

		test('clicking outside does not close when hideOnInteractOutside is false', async () => {
			const { dialog, baseElement } = await renderScreen({
				isOpen: true,
				hideOnInteractOutside: false,
			});
			await expect.element(dialog).toHaveAttribute('open');

			await userEvent.click(baseElement, { position: { x: 0, y: 0 } });
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

		test('changing isModal updates data-st-modal attribute', async () => {
			const { dialog, rerender } = await renderScreen({ isModal: true });
			await expect.element(dialog).toHaveAttribute('data-st-modal');

			await rerender({ isModal: false });
			await expect.element(dialog).not.toHaveAttribute('data-st-modal');
		});
	});
});
