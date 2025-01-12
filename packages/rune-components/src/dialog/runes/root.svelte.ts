import { uid } from 'uid';

export interface CreateDialogRootConfig {
	isOpen?: boolean;
	isModal?: boolean;
}

export type DialogRoot = ReturnType<typeof createDialogRoot>;

export function createDialogRoot(config?: CreateDialogRootConfig) {
	let isModal = $state(config?.isModal ?? true);
	let isOpen = $state(config?.isOpen ?? false);
	const setIsOpenListeners = new Set<(isOpen: boolean) => void>();
	const setIsModalListeners = new Set<(isModal: boolean) => void>();

	return {
		get isModal() {
			return isModal;
		},
		get isOpen() {
			return isOpen;
		},
		ids: {
			popup: uid(),
		},
		setIsOpen(v: boolean | undefined) {
			isOpen = v ?? false;
			for (const fn of setIsOpenListeners) fn(isOpen);
		},
		setIsModal(v: boolean | undefined) {
			isModal = v ?? true;
			for (const fn of setIsModalListeners) fn(isModal);
		},
		onSetIsOpen(fn: (isOpen: boolean) => void) {
			setIsOpenListeners.add(fn);
			return () => setIsOpenListeners.delete(fn);
		},
		onSetIsModal(fn: (isModal: boolean) => void) {
			setIsModalListeners.add(fn);
			return () => setIsModalListeners.delete(fn);
		},
	};
}
