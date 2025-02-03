import type { DialogRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateNonModalDialogPopupConfig {
	dialog: DialogRoot;
}

export type NonModalDialogPopup = ReturnType<typeof createNonModalDialogPopup>;

export function createNonModalDialogPopup(
	config: CreateNonModalDialogPopupConfig,
) {
	const { dialog } = config;
	let element: HTMLDialogElement | undefined;

	function toggleDialog() {
		if (!element) return;

		if (dialog.isOpen) {
			element.showPopover();
		} else {
			element.hidePopover();
		}
	}

	return {
		action(node) {
			element = node as unknown as HTMLDialogElement;
			dialog.setIsModal(false);
			toggleDialog();
			const unsubscribeOpen = dialog.onSetIsOpen(toggleDialog);
			return {
				destroy() {
					unsubscribeOpen();
					element = undefined;
				},
			};
		},
		props: {
			'aria-modal': 'false',
			'data-st-dialog-popup': '',
			'data-st-modal': false,
			get ['aria-hidden']() {
				return !dialog.isOpen || undefined;
			},
			get ['data-st-open']() {
				return dialog.isOpen;
			},
			get inert() {
				return !dialog.isOpen || undefined;
			},
			id: dialog.ids.popup,
			popover: 'auto',
			ontoggle(event) {
				const isOpen = event.newState === 'open';
				if (dialog.isOpen !== isOpen) {
					dialog.setIsOpen(isOpen);
				}
			},
		},
	} satisfies RuneComponent<'dialog'>;
}
