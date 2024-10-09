<script lang="ts">
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLAttributes<HTMLUListElement> {
		children?: Snippet;
		title?: string;
	}

	const { children, title }: Props = $props();
</script>

{#if title}
	<h5>{title}</h5>
{/if}
<ul>{@render children?.()}</ul>

<style>
	h5 {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-800);
		background-color: var(--_background-color-dark, var(--st-color-white));
		--_color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-400);
		color: var(--_color-dark, var(--st-color-neutral-900));
		font-size: var(--st-size-3);
		font-weight: 600;
		line-height: var(--st-size-4);
		padding-block-end: var(--st-size-1);
		padding-block-start: var(--st-size-2);
		position: sticky;
		text-transform: uppercase;
		top: 0px;
		white-space: nowrap;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: var(--st-size-1);
	}
	:global(li) h5,
	:global(li) ul {
		padding-inline-start: var(--st-size-2);
	}
</style>
