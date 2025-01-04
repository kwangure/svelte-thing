import { mergeActions } from '@svelte-thing/component-utils';
import {
	onclickoutside,
	onclickoutsiderect,
} from '../../actions/onclickoutside';

export interface CreateDialogRootConfig {
	hideOnInteractOutside?: boolean;
	isOpen?: boolean;
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
		action: mergeActions(onclickoutside, onclickoutsiderect, (node) => {
			element = node as unknown as HTMLDialogElement;
			return {
				destroy() {
					element = undefined;
				},
			};
		}),
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
			get ['data-st-modal']() {
				return isModal || undefined;
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
			onclickoutside() {
				if (hideOnInteractOutside) {
					close();
				}
			},
			onclickoutsiderect() {
				if (hideOnInteractOutside) {
					close();
				}
			},
		},
	};
}
