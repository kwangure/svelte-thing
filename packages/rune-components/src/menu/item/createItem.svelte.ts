import type { RuneComponent } from '../../types';
import type { TRoot } from '../root/createRoot.svelte';
import { uid } from 'uid';

export interface CreateItemConfig {
	root: TRoot;
}

export function createItem(config: CreateItemConfig) {
	const { root } = config;
	const key = uid();
	let element = $state<HTMLLIElement | null>(null);

	return {
		action(node) {
			element = node;
			root.itemKeys.add(key);

			return {
				destroy() {
					root.itemKeys.delete(key);
				},
			};
		},
		props: {
			'data-st-menu-item': true,
			get ['data-active-item']() {
				return root.activeKey === key;
			},
			'data-key': key,
			role: 'menuitem',
			get tabindex() {
				return root.activeKey === key ? 0 : -1;
			},
			onclick() {
				element?.closest<HTMLElement>('[role="menu"]')?.hidePopover();
			},
			onkeydown(event) {
				const char = event.key;

				if (event.ctrlKey || event.altKey || event.metaKey) {
					return;
				}

				if (event.shiftKey && event.key === 'Tab') {
					element
						?.closest<HTMLElement>('[role="menu"]')
						?.hidePopover();
				} else {
					switch (char) {
						case ' ':
						case 'Enter':
						case 'Esc':
						case 'Escape':
							element
								?.closest<HTMLElement>('[role="menu"]')
								?.hidePopover();
							root.button?.focus();
							// debugger;
							break;

						case 'Up':
						case 'ArrowUp':
							root.setFocusToPreviousMenuitem();
							break;

						case 'ArrowDown':
						case 'Down':
							root.setFocusToNextMenuitem();
							break;

						case 'Home':
						case 'PageUp':
							root.setFocusToFirstMenuitem();
							break;

						case 'End':
						case 'PageDown':
							root.setFocusToLastMenuitem();
							break;

						case 'Tab':
							element
								?.closest<HTMLElement>('[role="menu"]')
								?.hidePopover();
							root.button?.focus();
							break;

						default:
							break;
					}
				}
			},
			onmouseover() {
				root.activeKey = key;
			},
		},
	} satisfies RuneComponent<'li'>;
}
