import type { RuneComponent } from '../../types';
import { SvelteSet } from 'svelte/reactivity';
import { uid } from 'uid';

export type CreateRootConfig = Record<string, never>;

export type TRoot = ReturnType<typeof createRoot>;

export function createRoot(_config: CreateRootConfig) {
	let button = $state<HTMLButtonElement | null>(null);
	let element = $state<HTMLElement | null>(null);
	const itemKeys = new SvelteSet<string>();
	const { firstKey, lastKey, itemMap, menuitemNodes } = $derived.by(() => {
		const itemMap = new Map<string, { prev?: string; next?: string }>();
		const menuitemNodes: HTMLElement[] = [];
		let firstKey: string | undefined;
		let lastKey: string | undefined;

		if (!element) {
			return { firstKey, lastKey, itemMap, menuitemNodes };
		}

		let prevKey: string | undefined;

		// walk the DOM in document order
		const itemNodes = element.querySelectorAll<HTMLElement>(
			// exclude nested menu items
			'[data-st-menu-item]:not([data-st-menu-item] [data-st-menu-item])',
		);
		for (const itemNode of itemNodes) {
			const key = itemNode.dataset.key;
			if (key && itemKeys.has(key) && !itemNode.dataset.disabled) {
				itemMap.set(key, { prev: prevKey, next: undefined });
				menuitemNodes.push(itemNode);

				if (prevKey) {
					const prevEntry = itemMap.get(prevKey);
					if (prevEntry) prevEntry.next = key;
				}

				prevKey = key;
				if (!firstKey) {
					firstKey = key;
				}
				lastKey = key;
			}
		}

		return { firstKey, lastKey, itemMap, menuitemNodes };
	});
	let activeKey = $state<string>();

	function setFocusToMenuitem() {
		menuitemNodes.forEach(function (item) {
			if (item.dataset.key === activeKey) {
				item.focus();
			}
		});
	}

	return {
		action(node) {
			element = node;
		},
		get activeKey() {
			return activeKey;
		},
		set activeKey(value) {
			activeKey = value;
			setFocusToMenuitem();
		},
		get button() {
			return button;
		},
		set button(value: HTMLButtonElement | null) {
			button = value;
		},
		get itemKeys() {
			return itemKeys;
		},
		setFocusToPreviousMenuitem() {
			if (!activeKey) return;
			const newKey = itemMap.get(activeKey)?.prev;
			activeKey = newKey || lastKey;
			setFocusToMenuitem();
		},
		setFocusToNextMenuitem() {
			if (!activeKey) return;
			const newKey = itemMap.get(activeKey)?.next;
			activeKey = newKey || firstKey;
			setFocusToMenuitem();
		},
		setFocusToFirstMenuitem() {
			activeKey = firstKey;
			setFocusToMenuitem();
		},
		setFocusToLastMenuitem() {
			activeKey = lastKey;
			setFocusToMenuitem();
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
