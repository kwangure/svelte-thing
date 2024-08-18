/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { get, writable, type Writable } from 'svelte/store';

export type LineInterval = [number, number];

interface CopierOptions {
	text: string | undefined;
}

export function createCopier(options: CopierOptions) {
	const textToCopy = writable<string | undefined>(options.text);
	const isCopied = writable(false);

	let copyTimeout: ReturnType<typeof setTimeout>;
	function copyText() {
		if (typeof navigator === 'undefined') return;
		const text = get(textToCopy);
		if (!text) return;

		navigator.clipboard.writeText(text);
		isCopied.set(true);
		clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => isCopied.set(false), 2000);
	}

	function button(node: HTMLElement) {
		node.addEventListener('click', copyText);
		return {
			destroy() {
				clearTimeout(copyTimeout);
				node.removeEventListener('click', copyText);
			},
		};
	}

	return {
		elements: { button },
		inputs: { textToCopy },
		outputs: { isCopied },
	};
}
