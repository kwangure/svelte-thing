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

/**
 * Retrieves the value from a proxy created by a Svelte rune such as `$state`
 * or `$derived`. If the value is not a signal, it returns the original value
 * untouched.
 *
 * @example
 * const data = { foo: 'bar' }
 * const state = $state(data);
 * console.log(data === state) // false
 * console.log(data === getProxiedValue(state)) // true
 * console.log(getProxiedValue(19)) // 19
 */
export function getProxiedValue<T>(value: T) {
	if (value !== null && typeof value === 'object' && STATE_SYMBOL in value) {
		// @ts-expect-error signal
		return value[STATE_SYMBOL] as T;
	}

	return value;
}

/**
 * Compares two values using `Object.is`, taking into account possible proxied
 * signals
 *
 * @param {unknown} a - The first value to compare.
 * @param {unknown} b - The second value to compare.
 *
 * @example
 * const data = { foo: 'bar' }
 * const state = $state(data);
 * console.log(Object.is(data, state)); // false
 * console.log(stateIs(data, state)) // true
 */
export function stateIs(a: unknown, b: unknown) {
	return Object.is(getProxiedValue(a), getProxiedValue(b));
}
