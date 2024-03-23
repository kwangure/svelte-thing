<script>
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';
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

<code {...attributes}>
	{#each tokens as token}<Token {token} />{/each}
</code>

<style>
	code {
		--_border-color: var(--st-color-neutral-300);
		--_border-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-600);
		border-color: var(--_border-color-dark, var(--_border-color));
		--_background-color: var(--st-color-neutral-100);
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-900);
		background-color: var(--_background-color-dark, var(--_background-color));
		border-radius: var(--st-size-1);
		border-width: 1px;
		display: inline;
		font-size: var(--st-size-3_5);
		line-height: var(--st-size-5);
		padding-block: var(--st-size-0_5);
		padding-inline: var(--st-size-1);
	}
</style>
