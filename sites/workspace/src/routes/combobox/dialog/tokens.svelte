<script lang="ts">
	import { isTokenMatched } from '@content-thing/memdb';

	interface Props {
		tokens: [string, number][];
	}

	const { tokens }: Props = $props();
</script>

{#each tokens as [word, flags]}
	{#if isTokenMatched(flags)}
		<mark>{word}</mark>
	{:else}
		{word}
	{/if}
{/each}

<style>
	mark {
		--_color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-400);
		color: var(--_color-dark, var(--st-color-neutral-700));
		background-color: unset;
	}
	:global([data-active-item]) mark {
		--_color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		color: var(--_color-dark, var(--st-color-neutral-700));
	}
</style>
