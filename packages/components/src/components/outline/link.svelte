<script lang="ts">
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLAnchorAttributes {
		href: string;
		children: Snippet;
	}
	const { children, ...restProps }: Props = $props();
</script>

<a {...restProps}>
	{@render children()}
</a>

<style>
	a {
		align-items: center;
		border-radius: var(--st-size-1);
		cursor: pointer;
		display: flex;
		gap: var(--st-size-2);
		padding-block: var(--st-size-1);
		padding-inline: var(--st-size-4);
		transition:
			color 0.125s ease-in,
			background-color 0.125s ease-in-out;
	}
	a:hover {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		background-color: var(
			--_background-color-dark,
			var(--st-color-neutral-200)
		);
	}
	[aria-current='true'],
	[aria-current='location'],
	[aria-current='page'] {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		background-color: var(
			--_background-color-dark,
			var(--st-color-neutral-200)
		);
		color: var(--st-color-preference-dark) var(--st-color-neutral-300);
	}
	[aria-current='true']:hover,
	[aria-current='location']:hover,
	[aria-current='page']:hover {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-600);
		background-color: var(
			--_background-color-dark,
			var(--st-color-neutral-300)
		);
	}
</style>
