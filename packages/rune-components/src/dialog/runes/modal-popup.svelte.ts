import type { DialogRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';
import { isClickInsideRect } from '../../actions/onclickoutside.js';

export interface CreateModalDialogPopupConfig {
	dialog: DialogRoot;
}

export type ModalDialogPopup = ReturnType<typeof createModalDialogPopup>;

export function createModalDialogPopup(config: CreateModalDialogPopupConfig) {
	const { dialog } = config;
	let element: HTMLDialogElement | undefined;

	function toggleDialog() {
		if (!element) return;

		if (dialog.isOpen) {
			element.showModal();
		} else if (element.matches('[open]')) {
			element.close();
		}
	}

	return {
		action(node) {
			element = node as unknown as HTMLDialogElement;
			dialog.setIsModal(true);
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
			'aria-modal': 'true',
			'data-st-dialog-popup': '',
			'data-st-modal': true,
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
			onclose() {
				if (dialog.isOpen) {
					dialog.setIsOpen(false);
				}
			},
			onclick(event: MouseEvent) {
				if (
					dialog.isOpen &&
					element &&
					!isClickInsideRect(event, element)
				) {
					dialog.setIsOpen(false);
				}
			},
		},
	} satisfies RuneComponent<'dialog'>;
}
