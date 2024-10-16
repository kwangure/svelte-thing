import { getContext, setContext } from 'svelte';

export type SidebarVisibility = 'hidden' | 'shown';

export function createSidebarRoot() {
	let visibility = $state<SidebarVisibility>('hidden');
	let isMounted = $state(false);

	const setVisibilityListeners = new Set<(arg: SidebarVisibility) => void>();

	function setVisibility(v: SidebarVisibility) {
		visibility = v;
		for (const fn of setVisibilityListeners) {
			fn(v);
		}
	}

	return {
		action(_: HTMLElement) {
			isMounted = true;
			return {
				destroy() {
					isMounted = false;
				},
			};
		},
		get isMounted() {
			return isMounted;
		},
		props: {
			get 'data-visibility'() {
				return visibility;
			},
		},
		onSetVisibility(fn: (arg: SidebarVisibility) => void) {
			setVisibilityListeners.add(fn);
			return () => setVisibilityListeners.delete(fn);
		},
		hide() {
			setVisibility('hidden');
		},
		show() {
			setVisibility('shown');
		},
	};
}

const CONTEXT_KEY = '__SIDEBAR__';

export function getSidebarContext() {
	return getContext(CONTEXT_KEY) as ReturnType<typeof createSidebarRoot>;
}

export function setSidebarContext() {
	setContext(CONTEXT_KEY, createSidebarRoot());
}

export type SidebarRoot = ReturnType<typeof createSidebarRoot>;

export function createShow(sidebar: SidebarRoot) {
	return {
		action(node: HTMLElement) {
			return {
				destroy: sidebar.onSetVisibility((visibility) => {
					if (visibility === 'hidden') {
						node.focus();
					}
				}),
			};
		},
		props: {
			onclick() {
				sidebar.show();
			},
		},
	};
}

export function createHide(sidebar: SidebarRoot) {
	return {
		action(node: HTMLElement) {
			return {
				destroy: sidebar.onSetVisibility((visibility) => {
					if (visibility === 'shown') {
						node.focus();
					}
				}),
			};
		},
		props: {
			onclick() {
				sidebar.hide();
			},
		},
	};
}
