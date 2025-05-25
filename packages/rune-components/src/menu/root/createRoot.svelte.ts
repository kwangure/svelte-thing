import type { RuneComponent } from '../../types';
import { SvelteSet } from 'svelte/reactivity';
import { uid } from 'uid';

export type CreateRootConfig = Record<string, never>;

export type TRoot = ReturnType<typeof createRoot>;

export function createRoot(_config: CreateRootConfig) {
	let element = $state<HTMLElement | null>(null);
	const itemKeys = new SvelteSet<string>();
	const { firstKey, lastKey, itemMap } = $derived.by(() => {
		const itemMap = new Map<string, { prev?: string; next?: string }>();
		let firstKey: string | undefined;
		let lastKey: string | undefined;

		if (!element) {
			return { firstKey, lastKey, itemMap };
		}

		let prevKey: string | undefined;

		// walk the DOM in document order
		const itemNodes = element.querySelectorAll<HTMLElement>(
			// exclude nested menu items
			'[data-st-menu-item]:not([data-st-menu-item] [data-st-menu-item])',
		);
		for (const itemNode of itemNodes) {
			const id = itemNode.id;
			if (id && itemKeys.has(id) && !itemNode.dataset.disabled) {
				itemMap.set(id, { prev: prevKey, next: undefined });

				if (prevKey) {
					const prevEntry = itemMap.get(prevKey);
					if (prevEntry) prevEntry.next = id;
				}

				prevKey = id;
				if (!firstKey) {
					firstKey = id;
				}
				lastKey = id;
			}
		}

		return { firstKey, lastKey, itemMap };
	});
	let activeKey = $state<string>();

	return {
		action(node) {
			element = node;
		},
		get activeKey() {
			return activeKey;
		},
		set activeKey(value) {
			activeKey = value;
		},
		get itemKeys() {
			return itemKeys;
		},
		setFocusToPreviousMenuitem() {
			if (!activeKey) return;
			const newKey = itemMap.get(activeKey)?.prev;
			activeKey = newKey || lastKey;
		},
		setFocusToNextMenuitem() {
			if (!activeKey) return;
			const newKey = itemMap.get(activeKey)?.next;
			activeKey = newKey || firstKey;
		},
		setFocusToFirstMenuitem() {
			activeKey = firstKey;
		},
		setFocusToLastMenuitem() {
			activeKey = lastKey;
		},
		ids: {
			trigger: uid(),
			popup: uid(),
		},
		props: {
			'data-st-menu-root': '',
		},
	} satisfies RuneComponent<'div'>;
}
