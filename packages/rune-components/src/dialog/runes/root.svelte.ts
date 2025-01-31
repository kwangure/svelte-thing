import { DEV } from 'esm-env';
import { uid } from 'uid';

export interface CreateDialogRootConfig {
	isOpen?: boolean;
}

export type DialogRoot = ReturnType<typeof createDialogRoot>;

export function createDialogRoot(config?: CreateDialogRootConfig) {
	let isModal = $state<boolean>();
	let isOpen = $state(config?.isOpen ?? false);
	const setIsOpenListeners = new Set<(isOpen: boolean) => void>();

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
		setIsModal(v: boolean) {
			if (DEV && isModal !== undefined) {
				console.warn('Dialog root should have at most one modal.');
			}
			isModal = v;
		},
		setIsOpen(v: boolean | undefined) {
			isOpen = v ?? false;
			for (const fn of setIsOpenListeners) fn(isOpen);
		},
		onSetIsOpen(fn: (isOpen: boolean) => void) {
			setIsOpenListeners.add(fn);
			return () => setIsOpenListeners.delete(fn);
		},
	};
}
