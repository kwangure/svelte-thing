import type { TRoot } from '../root/createRoot.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateListboxConfig<TValue> {
	root: TRoot<TValue>;
}

export type TListbox = ReturnType<typeof createListbox>;

export function createListbox<TValue>(config: CreateListboxConfig<TValue>) {
	const { root } = config;
	return {
		props: {
			'data-st-combobox-listbox': '',
			get ['aria-label']() {
				return 'Suggestions';
			},
			id: root.ids.listbox,
			role: 'listbox',
		},
	} satisfies RuneComponent<'div'>;
}
