import type { TRoot } from '../root/createRoot.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateTriggerConfig {
	root: TRoot;
}

export type TTrigger = ReturnType<typeof createTrigger>;

export function createTrigger(config: CreateTriggerConfig) {
	const { root } = config;

	return {
		props: {
			'data-st-dialog-trigger-button': '',
			get ['aria-controls']() {
				return root.ids.popup;
			},
			get ['aria-expanded']() {
				return root.isOpen;
			},
			get ['aria-haspopup']() {
				return 'dialog' as const;
			},
			get ['popovertarget']() {
				return root.isModal ? undefined : root.ids.popup;
			},
			get ['onclick']() {
				return root.isModal
					? () => root.setIsOpen(!root.isOpen)
					: undefined;
			},
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
