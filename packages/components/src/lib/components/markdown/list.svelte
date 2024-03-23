<script>
	import '../../css/size.css';
	import Children from './children.svelte';

	/** @type {import('mdast').List} */
	export let node;
</script>

{#if node.ordered}
	<ol><Children {node} /></ol>
{:else}
	<ul><Children {node} /></ul>
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
