import type { DialogRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateDialogTriggerConfig {
	dialog: DialogRoot;
}

export type DialogTrigger = ReturnType<typeof createDialogTrigger>;

export function createDialogTrigger(config: CreateDialogTriggerConfig) {
	const { dialog } = config;

	return {
		props: {
			'data-st-dialog-trigger-button': '',
			get ['aria-controls']() {
				return dialog.ids.popup;
			},
			get ['aria-expanded']() {
				return dialog.isOpen;
			},
			get ['aria-haspopup']() {
				return 'dialog' as const;
			},
			get ['popovertarget']() {
				return dialog.isModal ? undefined : dialog.ids.popup;
			},
			onclick() {
				dialog.setIsOpen(!dialog.isOpen);
			},
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
