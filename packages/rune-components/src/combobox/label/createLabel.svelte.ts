import type { RuneComponent } from '../../types.js';
import type { TRoot } from '../root/createRoot.svelte.js';

export interface CreateLabelConfig<TValue> {
	root: TRoot<TValue>;
}

export type TLabel = ReturnType<typeof createLabel>;

export function createLabel<TValue>(config: CreateLabelConfig<TValue>) {
	const { root } = config;
	return {
		props: {
			'data-st-combobox-label': '',
			get for() {
				return root.ids.input;
			},
		},
	} satisfies RuneComponent<'label'>;
}
