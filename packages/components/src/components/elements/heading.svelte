<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		rank: 1 | 2 | 3 | 4 | 5 | 6;
	}

	const { rank, children, ...restProps }: Props = $props();
</script>

{#if rank === 1}
	<h1 {...restProps}>{@render children?.()}</h1>
{:else if rank === 2}
	<h2 {...restProps}>{@render children?.()}</h2>
{:else if rank === 3}
	<h3 {...restProps}>{@render children?.()}</h3>
{:else if rank === 4}
	<h4 {...restProps}>{@render children?.()}</h4>
{:else if rank === 5}
	<h5 {...restProps}>{@render children?.()}</h5>
{:else if rank === 6}
	<h6 {...restProps}>{@render children?.()}</h6>
{/if}

<style>
	@layer component {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			--_color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-200);
			color: var(--_color-dark, var(--st-color-neutral-900));
			font-weight: 600;
			scroll-margin-top: calc(
				var(--st-navbar-height) + var(--st-navbar-y-gap)
			);
		}
		h1,
		h2,
		h3,
		h4,
		h5 {
			margin-block-end: var(--st-size-2);
			margin-block-start: var(--st-size-4);
		}
		h1,
		h2 {
			letter-spacing: -0.025em;
		}
		h1 {
			--_font-size-sm: var(--st-breakpoint-sm) var(--st-size-9);
			font-size: var(--_font-size-sm, var(--st-size-7_5));
			--_line-height-sm: var(--st-breakpoint-sm) var(--st-size-10);
			line-height: var(--_line-height-sm, var(--st-size-9));
		}
		h2 {
			--_font-size-sm: var(--st-breakpoint-sm) var(--st-size-7_5);
			font-size: var(--_font-size-sm, var(--st-size-6));
			--_line-height-sm: var(--st-breakpoint-sm) var(--st-size-9);
			line-height: var(--_line-height-sm, var(--st-size-8));
		}
		h3 {
			--_font-size-sm: var(--st-breakpoint-sm) var(--st-size-6);
			font-size: var(--_font-size-sm, var(--st-size-5));
			--_line-height-sm: var(--st-breakpoint-sm) var(--st-size-8);
			line-height: var(--_line-height-sm, var(--st-size-7));
		}
	}
</style>
