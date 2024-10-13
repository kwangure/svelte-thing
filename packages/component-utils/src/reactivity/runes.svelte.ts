import { tick, untrack } from 'svelte';

/**
 * Runs the provided `fn` function after the signals in `read` have changed a specified
 * number of times.
 *
 * @example
 * skipEffect(() => someValue, (value) => {
 *   console.log(value); // Will run the effect after `someValue` changes twice.
 * }, 2);
 *
 * @param read - A function that returns a reactive value to be passed to `fn`.
 * @param fn - A function that takes the result of `read` and executes side
 * effects. It can optionally return a cleanup function.
 * @param [skipCount=1] - The number of times the read value will change before
 * `fn` is executed. Defaults to 1.
 */
export function skipEffect<T>(
	read: () => T,
	fn: (value: T) => void | (() => void),
	skipCount = 1,
) {
	let remainingSkips = skipCount;
	$effect(() => {
		const value = read();
		if (remainingSkips-- > 0) return;
		return untrack(() => fn(value));
	});
}

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
 */
export function watch<T>(read: () => T, fn: (value: T) => void | (() => void)) {
	$effect(() => {
		const value = read();
		untrack(() => fn(value));
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
