import type { RuneComponent } from '../../types';
import type { TRoot } from '../root/createRoot.svelte';

export interface CreatePopupConfig {
	root: TRoot;
}

export function createPopup(config: CreatePopupConfig) {
	const { root } = config;
	return {
		props: {
			'data-st-menu-popup': '',
			popover: '',
			id: root.ids.popup,
			role: 'menu',
			style: `position-anchor: --anchor-${root.ids.trigger};`,
			ontoggle(event) {
				if (event.newState === 'open') {
					if (!root.activeKey) {
						root.setFocusToFirstMenuitem();
					}
				} else {
					root.activeKey = undefined;
				}
			},
		},
	} satisfies RuneComponent<'ul'>;
}
