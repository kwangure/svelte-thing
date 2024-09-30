import { DEV } from 'esm-env';

export function invariant(
	condition: unknown,
	message: string,
): asserts condition {
	if (condition || !DEV) return;

	throw Error(message);
}
