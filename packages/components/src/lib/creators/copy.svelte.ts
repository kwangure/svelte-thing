export type LineInterval = [number, number];

interface CopierOptions {
	duration?: number;
	text?: string;
}

export function createCopier(options: CopierOptions) {
	let duration = $state(options.duration ?? 2000);
	let textToCopy = $state(options.text);
	let isCopied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout>;

	return {
		properties: {
			onclick() {
				if (typeof navigator === 'undefined') return;
				if (!textToCopy) return;

				navigator.clipboard.writeText(textToCopy);
				isCopied = true;
				clearTimeout(copyTimeout);
				copyTimeout = setTimeout(() => (isCopied = false), duration);
			},
		},
		get duration() {
			return duration;
		},
		set duration(d) {
			duration = d;
		},
		get isCopied() {
			return isCopied;
		},
		set text(t: string | undefined) {
			textToCopy = t;
		},
	};
}
