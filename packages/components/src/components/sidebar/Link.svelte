<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { createHide, getSidebarContext } from './sidebar.svelte.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	interface Props extends HTMLAnchorAttributes {
		href: string;
		children: Snippet;
	}
	let { children, ...restProps }: Props = $props();

	const sidebar = getSidebarContext();
	const hide = createHide(sidebar);
</script>

<a {...mergeProps(restProps, hide.props)} use:hide.action>
	{@render children?.()}
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
				var(--st-color-blue-200);
			background-color: var(
				--_background-color-dark,
				var(--st-color-blue-100)
			);
			--_color-dark: var(--st-color-preference-dark)
				var(--st-color-blue-700);
			color: var(--_color-dark, var(--st-color-blue-600));
		}
		[aria-current]:not([aria-current='false']) {
			--_background-color-dark: var(--st-color-preference-dark)
				var(--st-color-blue-100);
			background-color: var(
				--_background-color-dark,
				var(--st-color-blue-200)
			);
		}
	}
</style>
