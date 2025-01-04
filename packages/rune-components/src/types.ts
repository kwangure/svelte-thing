import type { MouseEventHandler, SvelteHTMLElements } from 'svelte/elements';

export type RemoveIndexSignature<T, Signature = string | number> = {
	[K in keyof T as Signature extends K ? never : K]: T[K];
};

export type HTMLElementAttributes = RemoveIndexSignature<SvelteHTMLElements>;

export interface RuneComponent<
	TElementTagName extends keyof HTMLElementTagNameMap,
> {
	action?: (_element: HTMLElementTagNameMap[TElementTagName]) => {
		destroy?: () => void;
		update?: () => void;
	} | void;
	props: HTMLElementAttributes[TElementTagName] & {
		onclickoutside?: MouseEventHandler<
			HTMLElementTagNameMap[TElementTagName]
		>;
	};
	[key: string]: unknown;
}

/**
 * Transforms the optional fields of a given object type into required fields,
 * preserving their types as `T | undefined`. Required fields in the original
 * type remain unchanged.
 *
 * @example
 * // Input
 * type MyRecord = {
 *   field1?: string; // optional
 *   field2: number; // required
 * };
 *
 * // Output
 * type MyRecord = {
 *   field1: string | undefined; // made required with `T | undefined`
 *   field2: number; // unchanged (already required)
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NullablyRequired<T> = { [P in keyof T & keyof any]: T[P] };
