import type { TRoot } from '../root/root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateTriggerConfig<TValue> {
	root: TRoot<TValue>;
}

export type TTrigger = ReturnType<typeof createTrigger>;

export function createTrigger<TValue>(config: CreateTriggerConfig<TValue>) {
	const { root } = config;

	return {
		props: {
			'data-st-combobox-trigger-button': '',
			get ['aria-controls']() {
				return root.ids.listbox;
			},
			get ['aria-expanded']() {
				return root.isOpen;
			},
			get ['aria-label']() {
				return 'Show suggestions';
			},
			onclick() {
				if (root.isOpen) {
					root.close();
				} else {
					root.open();
				}
			},
			tabindex: -1,
			type: 'button',
		},
	} satisfies RuneComponent<'button'>;
}
