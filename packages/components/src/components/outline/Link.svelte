<script lang="ts">
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
	@layer component {
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
		[aria-current]:not([aria-current='false']) {
			--_background-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-700);
			background-color: var(
				--_background-color-dark,
				var(--st-color-neutral-200)
			);
			color: var(--st-color-preference-dark) var(--st-color-neutral-300);
		}
		[aria-current]:not([aria-current='false']):hover {
			--_background-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-600);
			background-color: var(
				--_background-color-dark,
				var(--st-color-neutral-300)
			);
		}
	}
</style>
