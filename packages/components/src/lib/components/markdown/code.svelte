<script>
	import '../../css/color-preference.css';
	import '../../css/size.css';
	import { isScrollableX, isScrollableY } from '../../dom/dom.js';
	import {
		getSupportedHighlighter,
		highlightLines,
	} from '../../code/highlight';
	import Copy from '../../components/copy.svelte';
	import Token from '../token.svelte';

	/** @type {import('mdast').Code} */
	export let node;

	$: attributes = node.data?.attributes ?? {};

	/** @type {number | undefined} */
	let hoverRange = undefined;
	/** @type {import('../../code').Highlighter} */
	let highlighter = () => [{ segment: node.value, color: '' }];
	$: {
		getSupportedHighlighter(node.lang).then((h) => {
			highlighter = h;
		});
	}
	$: highlightedLines = highlightLines(node.value, highlighter);
	$: copyRanges = parseRanges(
		typeof (/** @type {any} */ (node.data?.attributes?.copy)) === 'string'
			? /** @type {{ copy: string }} */ (node.data?.attributes)?.copy
			: '',
	);
	$: lines = enrichLineRanges(highlightedLines, copyRanges);

	/**
	 * TODO: Extract and test
	 *
	 * @template {Record<any, any>} T
	 * @param {T[][]} lines
	 * @param {[number, number][]} ranges
	 */
	function enrichLineRanges(lines, ranges) {
		/** @type {Map<number, Set<number>>} */
		const rangeMap = new Map();

		// Construct a Map where each key is a line number
		// and each value is a set of range indexes.
		ranges.forEach(([start], index) => {
			if (!rangeMap.has(start)) {
				rangeMap.set(start, new Set());
			}
			rangeMap.get(start)?.add(index);
		});

		const enrichedLines = lines.map((line, index) => {
			const lineNumber = index + 1; // line numbers are 1-indexed;
			const segmentRanges = rangeMap.get(lineNumber);
			const ranges = [...(segmentRanges || [])];
			return { ranges, tokens: line };
		});

		return enrichedLines;
	}

	/**
	 * TODO: Extract and test
	 *
	 * @param {string} string
	 */
	function parseRanges(string) {
		/** @type {[number, number][]} */
		const result = [];
		if (!string) return result;

		const parts = string.split(',').map((part) => part.trim());

		parts.forEach((part) => {
			if (part.includes('-')) {
				const [start, end] = part.split('-').map(Number);
				result.push([start, end]);
			} else {
				const num = Number(part);
				result.push([num, num]);
			}
		});

		return result;
	}

	/** @param {number} rangeIndex */
	function getCopyText(rangeIndex) {
		const [start, end] = copyRanges[rangeIndex];
		const lines = node.value.split('\n');
		return lines.slice(start - 1, end).join('\n');
	}

	/**
	 * @param {number | undefined} hoverRange
	 * @param {number} index
	 */
	function checkRange(hoverRange, index) {
		if (hoverRange === undefined)
			return {
				isEnd: false,
				isInRange: false,
				iStart: false,
			};
		const [start, end] = copyRanges[hoverRange];
		const lineNumber = index + 1;
		return {
			isEnd: lineNumber === end,
			isInRange: start <= lineNumber && lineNumber <= end,
			isStart: lineNumber === start,
		};
	}

	/**
	 * Make overflowing element focusable to allow keyboard users to scroll
	 * using arrow keys
	 *
	 * @param {HTMLElement} node
	 */
	function overflowFocusable(node) {
		function checkOverflow() {
			// I imagine this would be commonly used for handling horizontal
			// keyboard scrolling so we start with X
			if (isScrollableX(node) || isScrollableY(node)) {
				node.setAttribute('tabindex', '0');
			} else {
				node.removeAttribute('tabindex');
			}
		}

		const resizeObserver = new ResizeObserver(checkOverflow);
		resizeObserver.observe(node);

		const mutationObserver = new MutationObserver(checkOverflow);
		mutationObserver.observe(node, {
			childList: true,
			subtree: true,
			characterData: true,
		});

		checkOverflow();

		return {
			destroy() {
				resizeObserver.disconnect();
				mutationObserver.disconnect();
			},
		};
	}
</script>

<code
	{...attributes}
	use:overflowFocusable
	on:mouseleave={() => (hoverRange = undefined)}
>
	{#each lines as { ranges, tokens }, i}
		{@const { isEnd, isInRange, isStart } = checkRange(hoverRange, i)}
		<div
			class="line"
			class:to-copy={isInRange}
			class:rounded-t={isStart}
			class:rounded-b={isEnd}
		>
			{#each tokens as token}<Token {token} />{/each}
		</div>
		<div class="actions">
			{#each ranges as range}
				{@const label =
					copyRanges[range][0] === copyRanges[range][1]
						? `Copy line ${copyRanges[range][0]}`
						: `Copy line ${copyRanges[range][0]} to ${copyRanges[range][1]}`}
				<Copy
					{label}
					text={() => getCopyText(range)}
					on:mouseleave={() => (hoverRange = undefined)}
					on:mouseenter={() => (hoverRange = range)}
				/>
			{/each}
		</div>
	{/each}
</code>

<style>
	code {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-900);
		background-color: var(
			--_background-color-dark,
			var(--st-color-neutral-100)
		);
		--_border-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-600);
		border-color: var(--_border-color-dark, var(--st-color-neutral-300));
		border-width: 1px;
		border-radius: var(--st-size-1);
		display: grid;
		font-size: var(--st-size-3_5);
		grid-template-columns: 1fr max-content;
		line-height: var(--st-size-6);
		margin-block-end: var(--st-size-2);
		margin-block-start: var(--st-size-4);
		padding-block: var(--st-size-4);
		padding-inline-start: var(--st-size-3);
		padding-inline-end: var(--st-size-5);
		overflow: auto;
		white-space: pre-wrap;
	}
	.to-copy {
		--_background-color-dark: var(--st-color-preference-dark)
			rgba(255, 255, 255, 0.1);
		background-color: var(--_background-color-dark, rgba(0, 0, 0, 0.1));
	}
	.line {
		padding-left: var(--st-size-2);
		height: var(--st-size-6);
	}
	.actions {
		align-items: center;
		display: flex;
		padding-inline: var(--st-size-1);
	}
</style>
