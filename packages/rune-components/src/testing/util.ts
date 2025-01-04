import { page, type LocatorSelectors } from '@vitest/browser/context';
import type { Component, ComponentProps } from 'svelte';
import type { RemoveIndexSignature } from '../types';
import type { RenderOptions, RenderResult2 } from 'vitest-browser-svelte';
import { render as __render } from 'vitest-browser-svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlaywrightLocator = page.elementLocator(document.body).constructor as any;

function getByAttribute(
	attrName: string,
	text: string,
	options?: { exact?: boolean },
) {
	const str = `"${text.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"${
		options?.exact ? 's' : 'i'
	}`;
	return new PlaywrightLocator(`internal:attr=[${attrName}=${str}]`);
}

PlaywrightLocator.prototype.getByAttribute = getByAttribute;

export function render<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	C extends Component<any, any>,
	P extends RemoveIndexSignature<ComponentProps<C>, `data-${string}`>,
>(
	Component: C,
	options?: P,
	renderOptions?: RenderOptions,
): RenderResult2<P, C> {
	return {
		...__render(Component, options, renderOptions),
		getByAttribute,
	};
}

declare module '@vitest/browser/context' {
	interface LocatorSelectors {
		getByAttribute: (attributeName: string, text: string) => Locator;
	}
}

declare module 'vitest-browser-svelte' {
	/**
	 * Render a component into the document.
	 */
	export function render<
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		C extends Component<any, any>,
		P extends RemoveIndexSignature<ComponentProps<C>, `data-${string}`>,
	>(
		Component: C,
		options?: P,
		renderOptions?: RenderOptions,
	): RenderResult2<P, C>;

	/**
	 * The rendered component and bound testing functions.
	 */
	interface RenderResult2<
		P extends Record<string, unknown>,
		C extends Component<P>,
	> extends LocatorSelectors {
		container: HTMLElement;
		baseElement: HTMLElement;
		component: C;
		debug: (el?: HTMLElement | DocumentFragment) => void;
		rerender: (props: Partial<P>) => Promise<void>;
		unmount: () => void;
	}
}
