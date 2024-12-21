<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import '../../css/breakpoint.css';
	import '../../css/size.css';

	interface Props extends HTMLButtonAttributes {
		children: Snippet;
	}
	const { children, ...restProps }: Props = $props();
</script>

<button {...restProps}>
	{@render children()}
</button>

<style>
	@layer component {
		button {
			align-items: center;
			border-radius: var(--st-size-1);
			display: flex;
			gap: var(--st-size-3);
			padding-block: var(--st-size-1);
			--_padding-inline-sm: var(--st-breakpoint-sm) var(--st-size-3);
			padding-inline: var(--_padding-inline-sm, var(--st-size-2));
			transition:
				color 0.125s ease-in,
				background-color 0.125s ease-in-out;
		}
		button:hover {
			--_background-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-700);
			background-color: var(
				--_background-color-dark,
				var(--st-color-neutral-200)
			);
		}
	}
</style>
