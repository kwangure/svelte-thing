import { isClickInside } from '@svelte-thing/dom-event';

export interface CreateDialogRootConfig {
	hideOnInteractOutside?: boolean;
	isOpen: boolean | null | undefined;
	isModal?: boolean;
}

export type DialogRoot = ReturnType<typeof createDialogRoot>;

export function createDialogRoot(config?: CreateDialogRootConfig) {
	let element: HTMLDialogElement | undefined;
	let hideOnInteractOutside = config?.hideOnInteractOutside ?? true;
	let isModal = $state(config?.isModal ?? true);
	let isOpen = $state(config?.isOpen ?? false);

	function close() {
		isOpen = false;
		element?.close();
	}

	function open() {
		isOpen = true;
		if (isModal) {
			element?.showModal();
		} else {
			element?.show();
		}
	}

	return {
		action(node: HTMLDialogElement) {
			element = node;
			return {
				destroy() {
					element = undefined;
				},
			};
		},
		get isModal() {
			return isModal;
		},
		get isOpen() {
			return isOpen;
		},
		close,
		open,
		setHideOnInteractOutside(v: boolean | undefined) {
			hideOnInteractOutside = v ?? true;
		},
		setIsModal(v: boolean | undefined) {
			isModal = v ?? true;
		},
		props: {
			'data-st-dialog-root': '',
			get ['aria-hidden']() {
				return !isOpen || undefined;
			},
			get inert() {
				return !isOpen || undefined;
			},
			get open() {
				return isOpen || undefined;
			},
			onclose() {
				isOpen = false;
			},
			onclick(event: Event) {
				if (
					hideOnInteractOutside &&
					element &&
					!isClickInside(event, element)
				) {
					close();
				}
			},
		},
	};
}
