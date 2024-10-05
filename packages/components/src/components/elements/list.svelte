<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../../css/size.css';

	interface Props {
		ordered?: boolean;
		children: Snippet;
	}

	const { ordered, children }: Props = $props();
</script>

{#if ordered}
	<ol>{@render children()}</ol>
{:else}
	<ul>{@render children()}</ul>
{/if}

<style>
	ol,
	ul {
		padding-inline-start: var(--st-size-6);
	}
	ol {
		list-style-type: decimal;
	}
	ul {
		list-style-type: disc;
	}
</style>
