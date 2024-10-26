<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';

	interface Props extends HTMLAnchorAttributes {
		children: Snippet;
	}

	const {
		children,
		target,
		rel = target === '_blank' ? 'noopener' : undefined,
		...restProps
	}: Props = $props();
</script>

<a {...restProps} {rel} {target}>
	{@render children()}
</a>

<style>
	a {
		align-items: center;
		border-radius: var(--st-size-1);
		display: flex;
		gap: var(--st-size-3);
		padding-block: var(--st-size-1);
		padding-inline: var(--st-size-2);
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
</style>
