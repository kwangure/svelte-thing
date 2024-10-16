<script lang="ts">
	import '../../css/breakpoint.css';
	import type { Snippet } from 'svelte';
	import { setSidebarContext } from '../sidebar/sidebar.svelte.js';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();

	setSidebarContext();
</script>

<div>
	{@render children()}
</div>

<style>
	:root {
		--st-navbar-height: 4rem;
		--st-navbar-y-gap: 0.5rem;
	}
	div {
		display: grid;
		--_grid-template-columns: [page-start] 1fr [nav-start] min-content
			[content-start] var(--st-content-width, 6fr) [content-end nav-end]
			1fr [page-end];
		--_grid-template-columns-xl: var(--st-breakpoint-xl) [page-start] 1fr
			[nav-start] min-content [content-start]
			var(--st-content-width, 60rem /* 960px */) [content-end nav-end] 1fr
			[page-end];
		grid-template-columns: var(
			--_grid-template-columns-xl,
			var(--_grid-template-columns)
		);
		grid-template-rows: var(--st-navbar-height) 1fr;
		height: 100%;
		overflow-y: auto;
		row-gap: var(--st-navbar-y-gap);
	}
</style>
