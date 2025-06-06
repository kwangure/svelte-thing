import type { RuneComponent } from '../../types';
import type { TRoot } from '../root/createRoot.svelte';
import { cancelEvent } from '@svelte-thing/dom-event';

export interface CreatePopupConfig {
	root: TRoot;
}

export type TPopup = ReturnType<typeof createPopup>;

export function createPopup(config: CreatePopupConfig) {
	const { root } = config;
	return {
		props: {
			'data-st-menu-popup': '',
			get ['aria-activedescendant']() {
				return root.activeKey;
			},
			tabindex: -1,
			popover: '',
			id: root.ids.popup,
			role: 'menu',
			style: `position-anchor: --anchor-${root.ids.trigger};`,
			onkeydown(event) {
				const popover = event.currentTarget;

				switch (event.key) {
					case ' ':
					case 'Enter':
						setTimeout(() => popover.hidePopover(), 0);
						break;

					case 'ArrowDown':
					case 'Down':
						root.setFocusToNextMenuitem();
						cancelEvent(event);
						break;

					case 'Up':
					case 'ArrowUp':
						root.setFocusToPreviousMenuitem();
						cancelEvent(event);
						break;

					case 'Home':
					case 'PageUp':
						root.setFocusToFirstMenuitem();
						cancelEvent(event);
						break;

					case 'End':
					case 'PageDown':
						root.setFocusToLastMenuitem();
						cancelEvent(event);
						break;

					default:
						break;
				}
			},
			ontoggle(event) {
				if (event.newState === 'open') {
					event.currentTarget.focus();
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
