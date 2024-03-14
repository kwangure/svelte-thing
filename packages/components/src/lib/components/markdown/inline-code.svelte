<script>
	import '../../css/color-preference.css';
	import { getSupportedHighlighter } from '../../code/highlight.js';
	import { plaintext } from '../../code/highlighter/plaintext';
	import Token from '../token.svelte';

	/** @type {import('mdast').InlineCode} */
	export let node;

	$: attributes = node.data?.attributes ?? {};
	let highlighter = plaintext;
	$: {
		getSupportedHighlighter(attributes?.lang).then((h) => {
			highlighter = h;
		});
	}
	$: tokens = highlighter(node.value);
</script>

<code
	class="inline rounded border border-neutral-300 bg-neutral-100 px-1 py-0.5 text-sm dark:border-neutral-600 dark:bg-neutral-900"
	{...attributes}
>
	{#each tokens as token}<Token {token} />{/each}
</code>
