import type { DialogRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateDialogCloseConfig {
	dialog: DialogRoot;
}

export type DialogClose = ReturnType<typeof createDialogClose>;

export function createDialogClose(config: CreateDialogCloseConfig) {
	const { dialog } = config;

	return {
		props: {
			'data-st-dialog-close-button': '',
			get ['aria-label']() {
				return 'Close dialog';
			},
			onclick() {
				dialog.setIsOpen(false);
			},
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
