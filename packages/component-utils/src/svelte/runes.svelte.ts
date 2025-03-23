import { tick, untrack } from 'svelte';

/**
 * Similar to `$effect`, but with explicit opt-in to tracking via the `read`
 * function. Signals in `read` trigger reruns of `fn`, but signals in `fn` will
 * not trigger reruns of `fn`.
 *
 * @example
 * let unwatchedSignal = $state('foo')
 * watch(() => someValue, (value) => {
 *   console.log(value, unwatchedSignal); // Only logs when `someValue` changes.
 * });
 *
 * @param read - A function that returns a reactive value to be watched.
 * @param fn - A function that is executed when the value changes. It can
 * optionally return a cleanup function.
 * @param operators - Optional operator functions that transform how the effect
 * function behaves. Operators are composed from left to right.
 */
export function watch<T>(
	read: () => T,
	fn: (value: T) => void | (() => void),
	...operators: ((
		fn: (value: T) => void | (() => void),
	) => (value: T) => void | (() => void))[]
) {
	let effectFn = fn;
	for (const operator of operators) {
		effectFn = operator(effectFn);
	}
	$effect(() => {
		const value = read();
		const cleanup = untrack(() => effectFn(value));
		return cleanup;
	});
}

export type KeyedWatcherSetup = () => KeyedWatcherCleanup;

export type KeyedWatcherCleanup = (() => unknown) | void | undefined;

/**
 * Creates a keyed watcher that runs a setup function after the first listener
 * of a signal reads it and calls the cleanup function when no more watchers
 * are listening.
 *
 * @example
 * export function makeClock() {
 *   let date = $state<Date>();
 *
 *   const watcher = createKeyedWatcher();
 *
 *   // Setup function used as key to track how many watchers are listening to `date`
 *   function initializeExpensiveClock() {
 *     const intervalId = setInterval(() => (date = new Date()), 1000);
 *     const cleanupWhenNoOneIsListening = () => clearInterval(intervalId);
 *     return cleanupWhenNoOneIsListening;
 *   }
 *
 *   return {
 *     get date() {
 *       watcher.watch(initializeExpensiveClock);
 *       return date;
 *     },
 *     // ...add more getter properties with watchers here
 *     // You can use the same `initializeExpensiveClock` as the watch key if
 *     // they rely on `date` or a different function managing a different resource
 *   };
 * }
 */
export function createKeyedWatcher() {
	const watchers = new Map<
		KeyedWatcherSetup,
		[number, KeyedWatcherCleanup]
	>();

	return {
		/**
		 * Registers a setup function to be watched. If the setup function is
		 * already being watched, it increases the reference count. When all
		 * references are removed, the cleanup function is called.
		 *
		 * @param setup - A function that sets up the watcher and returns an
		 * optional cleanup function.
		 */
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
