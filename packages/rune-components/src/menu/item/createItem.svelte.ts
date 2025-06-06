import type { RuneComponent } from '../../types';
import type { TRoot } from '../root/createRoot.svelte';
import { uid } from 'uid';

export interface CreateItemConfig {
	root: TRoot;
}

export type TItem = ReturnType<typeof createItem>;

export function createItem(config: CreateItemConfig) {
	const { root } = config;
	const id = uid();

	return {
		action(_node) {
			root.itemKeys.add(id);

			return {
				destroy() {
					root.itemKeys.delete(id);
				},
			};
		},
		props: {
			'data-st-menu-item': true,
			get ['data-active-item']() {
				return root.activeKey === id;
			},
			id: id,
			role: 'menuitem',
			onclick(event) {
				event.currentTarget
					.closest<HTMLElement>('[popover]')
					?.hidePopover();
			},
			onmouseover() {
				root.activeKey = id;
			},
		},
	} satisfies RuneComponent<'li'>;
}
