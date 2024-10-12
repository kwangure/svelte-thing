// @ts-expect-error internal module
import { proxy } from 'svelte/internal/client';

export let STATE_SYMBOL = Symbol('$state'); // temp `Symbol` because TypeScript

const handler = {
	has(_: unknown, property: symbol) {
		if (String(property) === 'Symbol($state)') {
			STATE_SYMBOL = property; // actual symbol we want
		}
		return false;
	},
};

proxy(new Proxy({}, handler));

export function getProxiedValue<T>(value: T) {
	if (value !== null && typeof value === 'object' && STATE_SYMBOL in value) {
		// @ts-expect-error signal
		return value[STATE_SYMBOL] as T;
	}

	return value;
}

export function stateIs(a: unknown, b: unknown) {
	return Object.is(getProxiedValue(a), getProxiedValue(b));
}
