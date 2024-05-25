import type { HighlightResult } from './lib/code/highlight.js';
import type { LineInterval } from './lib/creators/copy.js';

declare module 'mdast' {
	interface HeadingData {
		value: string;
		id: string;
	}
	interface InlineCodeData {
		attributes: {
			lang?: string;
		};
	}
	interface CodeData {
		attributes: {
			copy?: string;
		};
		copy?: {
			ranges: LineInterval[];
			text: string;
		};
		highlightedLines?: HighlightResult[][];
	}
}
