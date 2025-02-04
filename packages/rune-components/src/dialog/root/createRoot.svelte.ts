import { DEV } from 'esm-env';
import { uid } from 'uid';
import type { RuneComponent } from '../../types.js';

export interface CreateRootConfig {
	isOpen?: boolean;
}

export type TRoot = ReturnType<typeof createRoot>;

export function createRoot(config?: CreateRootConfig) {
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
			for (const fn of setIsOpenListeners) {
				fn(isOpen);
			}
		},
		onSetIsOpen(fn: (isOpen: boolean) => void) {
			setIsOpenListeners.add(fn);
			return () => setIsOpenListeners.delete(fn);
		},
		props: {
			'data-st-dialog-root': '',
		},
	} satisfies RuneComponent<'div'>;
}
