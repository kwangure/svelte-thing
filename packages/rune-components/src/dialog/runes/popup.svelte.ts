import type { DialogRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';
import { isClickInsideRect } from '../../actions/onclickoutside.js';

export interface CreateDialogPopupConfig {
	dialog: DialogRoot;
}

export type DialogPopup = ReturnType<typeof createDialogPopup>;

export function createDialogPopup(config: CreateDialogPopupConfig) {
	const { dialog } = config;
	let element: HTMLDialogElement | undefined;

	function toggleDialog() {
		if (!element) return;

		if (dialog.isOpen) {
			// Now open in the desired mode
			if (dialog.isModal) {
				if (element.matches(':popover-open')) {
					element.hidePopover();
				}
				element.showModal();
			} else {
				if (element.matches('[open]')) {
					element.close();
				}
				element.showPopover();
			}
		} else {
			if (dialog.isModal) {
				if (element.matches('[open]')) {
					// TODO: Use `.requestClose()` once widely implemented/available
					// See https://github.com/whatwg/html/pull/10737
					element.close();
				}
			} else {
				if (element.matches(':popover-open')) {
					element.hidePopover();
				}
			}
		}
	}

	return {
		action(node) {
			element = node as unknown as HTMLDialogElement;
			toggleDialog();
			const unsubscribeOpen = dialog.onSetIsOpen(toggleDialog);
			const unsubscribeModal = dialog.onSetIsModal(toggleDialog);
			return {
				destroy() {
					unsubscribeOpen();
					unsubscribeModal();
					element = undefined;
				},
			};
		},
		props: {
			'data-st-dialog-popup': '',
			get ['aria-hidden']() {
				return !dialog.isOpen || undefined;
			},
			get ['aria-modal']() {
				return dialog.isModal;
			},
			get ['data-st-modal']() {
				return dialog.isModal || undefined;
			},
			get ['popover']() {
				return !dialog.isModal ? 'auto' : undefined; // render in top-layer.
			},
			id: dialog.ids.popup,
			get inert() {
				return !dialog.isOpen || undefined;
			},
			ontoggle(event) {
				const v = event.newState === 'open';
				if (dialog.isOpen !== v) {
					dialog.setIsOpen(v);
				}
			},
			onclick(event: MouseEvent) {
				// TODO: Use `'closedby'` attribute once implemented and widely available
				// See https://github.com/whatwg/html/pull/10737
				if (
					dialog.isOpen &&
					element &&
					!isClickInsideRect(event, element)
				) {
					return dialog.setIsOpen(false);
				}
			},
		},
	} satisfies RuneComponent<'dialog'>;
}
