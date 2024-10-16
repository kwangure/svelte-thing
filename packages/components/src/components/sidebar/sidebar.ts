import { getContext, setContext, tick } from 'svelte';
import { focustrap } from '../../actions/focustrap.js';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { writable } from 'svelte/store';
import { on } from 'svelte/events';

export function createSidebar() {
	const visibility = writable<'hidden' | 'hiding' | 'shown' | 'showing'>(
		'hidden',
	);
	const shouldShowToggle = writable(false);

	function show(node: HTMLElement, options?: { focus?: boolean }) {
		const off = on(node, 'click', () => visibility.set('shown'));

		let { focus = false } = options || {};
		const unsubscribe = visibility.subscribe(async ($visibility) => {
			if ($visibility === 'hidden' && focus) {
				// wait for hidden DOM to update w/ new `hidden` visiblity
				await tick();
				node.focus();
			}
		});

		return {
			update(_options: typeof options) {
				({ focus = false } = _options || {});
			},
			destroy() {
				unsubscribe();
				off();
			},
		};
	}

	function hide(node: HTMLElement, options?: { focus?: boolean }) {
		const off = on(node, 'click', () => visibility.set('hidden'));

		let { focus = false } = options || {};
		const unsubscribe = visibility.subscribe(async ($visibility) => {
			if ($visibility === 'shown' && focus) {
				// wait for hidden DOM to update w/ new `shown` visiblity
				await tick();
				node.focus();
			}
		});

		return {
			update(_options: typeof options) {
				({ focus = false } = _options || {});
			},
			destroy() {
				unsubscribe();
				off();
			},
		};
	}

	return {
		elements: { hide, show, panel: focustrap },
		state: {
			shouldShowToggle,
			visibility: { subscribe: visibility.subscribe },
		},
	};
}

const CONTEXT_KEY = '__SIDEBAR__';

export function getSidebarContext() {
	return getContext(CONTEXT_KEY) as ReturnType<typeof createSidebar>;
}

export function setSidebarContext() {
	setContext(CONTEXT_KEY, createSidebar());
}
