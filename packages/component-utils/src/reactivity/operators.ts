/**
 * A function that transforms an effect function by wrapping it with additional behavior.
 * The operator can modify when and how the effect function is called, but should not
 * modify how the reactive value is read.
 */
export type WatchOperator<T> = (
	fn: (value: T) => void | (() => void),
) => (value: T) => void | (() => void);

/**
 * Creates an operator that skips the first N changes of a reactive value before
 * running the effect function.
 *
 * @example
 * watch(() => someValue, (value) => {
 *   console.log(value); // Will run after skipping the first 2 changes
 * }, skip(2));
 *
 * @param count - The number of changes to skip before running the effect
 */
export function skip<T>(count: number): WatchOperator<T> {
	return (fn) => {
		let remainingSkips = count;
		return (value) => {
			if (remainingSkips-- > 0) return;
			return fn(value);
		};
	};
}
