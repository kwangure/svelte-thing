<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<main>
	{@render children?.()}
</main>

<style>
	main {
		display: grid;
		grid-column-end: content-end;
		grid-column-start: content-start;
		grid-row-end: 3;
		grid-row-start: 2;
		grid-template-columns: [prose-start] 1fr [prose-end outline-start] min-content [outline-end];
		min-width: 0px;
	}
</style>
