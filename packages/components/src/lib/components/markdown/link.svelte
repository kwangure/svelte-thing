<script>
	import Children from './children.svelte';
	/** @type {import('mdast').Link} */
	export let node;
</script>

<a class="underline underline-offset-2 hover:decoration-2 text-blue-500" href={node.url} title={node.title}>
	<Children {node} />
</a>
