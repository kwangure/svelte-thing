import type { TRoot } from '../root/root.svelte.js';
import type { RuneComponent } from '../../types.js';
import { isClickInsideRect } from '../../actions/onclickoutside.js';

export interface CreateModalPopupConfig {
	root: TRoot;
}

export type TModalPopup = ReturnType<typeof createModalPopup>;

export function createModalPopup(config: CreateModalPopupConfig) {
	const { root } = config;
	let element: HTMLDialogElement | undefined;

	function toggleDialog() {
		if (!element) return;

		if (root.isOpen) {
			element.showModal();
		} else if (element.matches('[open]')) {
			element.close();
		}
	}

	return {
		action(node) {
			element = node as unknown as HTMLDialogElement;
			root.setIsModal(true);
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
			'aria-modal': 'true',
			'data-st-dialog-popup': '',
			'data-st-modal': true,
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
			onclose() {
				if (root.isOpen) {
					root.setIsOpen(false);
				}
			},
			onclick(event: MouseEvent) {
				if (
					root.isOpen &&
					element &&
					!isClickInsideRect(event, element)
				) {
					root.setIsOpen(false);
				}
			},
		},
	} satisfies RuneComponent<'dialog'>;
}
