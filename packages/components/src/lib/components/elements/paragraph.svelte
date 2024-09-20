<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../../css/size.css';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<p>{@render children()}</p>

<style>
	p {
		line-height: var(--st-size-7);
		margin-block-end: var(--st-size-4);
	}
</style>
