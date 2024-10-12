import { untrack } from 'svelte';

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
