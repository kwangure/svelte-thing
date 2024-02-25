<script>
	import '../../code/code.css';
	import { getHighlighter, isSupportedLanguage } from '../../code/index.js';

	/** @type {import('mdast').InlineCode} */
	export let node;

	/** @type {import('../../code/highlight').Highlighter} */
	const NOOP_HIGHLIGHTER = (code, options) => {
		const from = options?.from ?? 0;
		const to = options?.to ?? code.length;

		return [{ segment: code.slice(from, to), color: '' }];
	};
	let highlighter = NOOP_HIGHLIGHTER;

	$: attributes = node.data?.attributes ?? {};
	$: language = attributes?.lang;
	$: {
		if (isSupportedLanguage(language)) {
			getHighlighter(language).then((h) => (highlighter = h));
		} else {
			highlighter = NOOP_HIGHLIGHTER;
		}
	}
	$: segments = highlighter(node.value);
</script>

<code
	class="inline rounded border border-neutral-300 bg-neutral-100 px-1 py-0.5 text-sm dark:border-neutral-600 dark:bg-neutral-900"
	{...attributes}
>
	{#each segments as { color, segment }}
		<span class={color}>{segment}</span>
	{/each}
</code>
