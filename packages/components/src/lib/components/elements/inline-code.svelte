<script lang="ts">
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';
	import { type HighlightResult } from '../../code/highlight.js';
	import Token from '../token.svelte';

	export let attributes: Record<string, unknown> | undefined = undefined;
	export let tokens: HighlightResult[];
</script>

<code {...attributes}>
	{#each tokens as token}<Token {token} />{/each}
</code>

<style>
	code {
		--_border-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-600);
		border-color: var(--_border-color-dark, var(--st-color-neutral-300));
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-900);
		background-color: var(
			--_background-color-dark,
			var(--st-color-neutral-100)
		);
		border-radius: var(--st-size-1);
		border-width: 1px;
		display: inline;
		font-size: var(--st-size-3_5);
		line-height: var(--st-size-5);
		padding-block: var(--st-size-0_5);
		padding-inline: var(--st-size-1);
	}
</style>
