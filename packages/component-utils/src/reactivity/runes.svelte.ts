import { untrack } from 'svelte';

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
