import type { TRoot } from '../root/root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateCloseConfig {
	root: TRoot;
}

export type TClose = ReturnType<typeof createClose>;

export function createClose(config: CreateCloseConfig) {
	const { root } = config;

	return {
		props: {
			'data-st-dialog-close-button': '',
			get ['aria-label']() {
				return 'Close dialog';
			},
			get ['popovertarget']() {
				return root.isModal ? undefined : root.ids.popup;
			},
			get ['popovertargetaction']() {
				return root.isModal ? undefined : 'hide';
			},
			onclick() {
				root.setIsOpen(false);
			},
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
