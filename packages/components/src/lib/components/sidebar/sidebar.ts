import { getContext, setContext, tick } from 'svelte';
import { focustrap } from '../../actions/focustrap.js';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { writable, type Writable } from 'svelte/store';

export function createSidebar() {
	const visibility = writable<'hidden' | 'hiding' | 'shown' | 'showing'>(
		'hidden',
	);
	const shouldShowToggle = writable(false);

	const setHidden = () => visibility.set('hidden');
	const setShown = () => visibility.set('shown');

	function show(node: HTMLElement, options?: { focus?: boolean }) {
		node.addEventListener('click', setShown);

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
				node.removeEventListener('click', setShown);
			},
		};
	}

	function hide(node: HTMLElement, options?: { focus?: boolean }) {
		node.addEventListener('click', setHidden);

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
				node.removeEventListener('click', setHidden);
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
