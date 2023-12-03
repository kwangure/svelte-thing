<script>
	import Children from './children.svelte';

	/** @type {import('mdast').List} */
	export let node;
</script>

{#if node.ordered}
	<ol class="list-decimal pl-6">
		<Children {node} />
	</ol>
{:else}
	<ul class="list-disc pl-6">
		<Children {node} />
	</ul>
{/if}
