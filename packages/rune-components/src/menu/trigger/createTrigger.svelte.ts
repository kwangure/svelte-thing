import type { RuneComponent } from '../../types';
import type { TRoot } from '../root/createRoot.svelte.js';

export interface CreateTriggerConfig {
	root: TRoot;
}

export type TTrigger = ReturnType<typeof createTrigger>;

export function createTrigger({ root }: CreateTriggerConfig) {
	return {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		action(_node) {},
		props: {
			'data-st-menu-trigger-button': '',
			'data-st-trigger-button': '',
			// @ts-expect-error not yet added to Svelte types
			commandfor: root.ids.popup,
			command: 'toggle-popover',
			id: root.ids.trigger,
			type: 'button',
			style: `anchor-name: --anchor-${root.ids.trigger};`,
			onkeydown(event) {
				const button = event.currentTarget;
				// @ts-expect-error not yet added to TypeScript types
				const popover = button.commandForElement as HTMLUListElement;

				switch (event.key) {
					case 'ArrowDown':
					case 'Down':
						popover.showPopover();
						break;

					case 'Up':
					case 'ArrowUp':
						popover.showPopover();
						root.setFocusToLastMenuitem();
						break;

					default:
						break;
				}
			},
		},
	} satisfies RuneComponent<'button'>;
}
