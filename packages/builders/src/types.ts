import type {
	HTMLAttributes,
	MouseEventHandler,
	SvelteHTMLElements,
} from 'svelte/elements';

type RemoveIndexSignature<T> = {
	[K in keyof T as string extends K
		? never
		: number extends K
		  ? never
		  : K]: T[K];
};

type HTMLElementAttributes = RemoveIndexSignature<
	SvelteHTMLElements & { search: HTMLAttributes<HTMLElement> }
>;

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
