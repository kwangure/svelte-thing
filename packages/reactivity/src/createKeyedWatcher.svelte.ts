import { tick, untrack } from 'svelte';

export interface KeyedWatcherSetup {
	(): KeyedWatcherCleanup;
}

export type KeyedWatcherCleanup = (() => unknown) | void | undefined;

export function createKeyedWatcher() {
	const watchers = new Map<KeyedWatcherSetup, [number, KeyedWatcherCleanup]>();

	return {
		watch(setup: KeyedWatcherSetup) {
			if ($effect.tracking()) {
				$effect(() => {
					let entry = watchers.get(setup);
					if (!entry) {
						const cleanup = untrack(setup);
						entry = [0, cleanup];
						watchers.set(setup, entry);
					}
					entry[0]++;

					return () => {
						tick().then(() => {
							entry[0]--;
							if (entry[0] === 0) {
								entry[1]?.(); // Run cleanup
								watchers.delete(setup);
							}
						});
					};
				});
			}
		},
	};
}
