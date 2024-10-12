export function skipEffect<T>(
	read: () => T,
	run: (value: T) => void | (() => void),
	skipCount = 1,
) {
	let remainingSkips = skipCount;
	$effect(() => {
		if (remainingSkips-- > 0) {
			read();
			return;
		}
		return run(read());
	});
}
