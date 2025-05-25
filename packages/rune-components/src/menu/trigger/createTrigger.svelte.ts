import type { RuneComponent } from '../../types';
import type { TRoot } from '../root/createRoot.svelte.js';

export interface CreateTriggerConfig {
	root: TRoot;
}

export function createTrigger({ root }: CreateTriggerConfig) {
	let element = $state<HTMLButtonElement | null>(null);
	return {
		action(node) {
			element = node;
			root.button = node;
			return {
				destroy() {
					root.button = null;
					element = null;
				},
			};
		},
		props: {
			'data-st-menu-trigger-button': '',
			// @ts-expect-error not yet added to Svelte types
			commandfor: root.ids.popup,
			command: 'toggle-popover',
			id: root.ids.trigger,
			type: 'button',
			style: `anchor-name: --anchor-${root.ids.trigger};`,
			onkeydown(event) {
				const key = event.key;

				switch (key) {
					case ' ':
					case 'ArrowDown':
					case 'Down':
						// @ts-expect-error not yet added to TypeScript types
						element?.commandForElement.showPopover();
						break;

					case 'Esc':
					case 'Escape':
						// @ts-expect-error not yet added to TypeScript types
						element?.commandForElement.hidePopover();
						break;

					case 'Up':
					case 'ArrowUp':
						// @ts-expect-error not yet added to TypeScript types
						element?.commandForElement.showPopover();
						root.setFocusToLastMenuitem();

						break;

					default:
						break;
				}
			},
		},
	} satisfies RuneComponent<'button'>;
}
