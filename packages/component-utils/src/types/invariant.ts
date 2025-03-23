import { DEV } from 'esm-env';

export function invariant(
	condition: unknown,
	message: string,
): asserts condition {
	if (DEV && !condition) {
		throw Error(message);
	}
}
