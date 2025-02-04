import type { TRoot } from '../root/root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateNonModalPopupConfig {
	root: TRoot;
}

export type TNonModalPopup = ReturnType<typeof createNonModalPopup>;

export function createNonModalPopup(config: CreateNonModalPopupConfig) {
	const { root } = config;
	let element: HTMLDialogElement | undefined;

	function toggleDialog() {
		if (!element) return;

		if (root.isOpen) {
			element.showPopover();
		} else {
			element.hidePopover();
		}
	}

	return {
		action(node) {
			element = node as unknown as HTMLDialogElement;
			root.setIsModal(false);
			toggleDialog();
			const unsubscribeOpen = root.onSetIsOpen(toggleDialog);
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
				return !root.isOpen || undefined;
			},
			get ['data-st-open']() {
				return root.isOpen;
			},
			get inert() {
				return !root.isOpen || undefined;
			},
			id: root.ids.popup,
			popover: 'auto',
			ontoggle(event) {
				const isOpen = event.newState === 'open';
				if (root.isOpen !== isOpen) {
					root.setIsOpen(isOpen);
				}
			},
		},
	} satisfies RuneComponent<'dialog'>;
}
