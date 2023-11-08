<script>
	import Children from './children.svelte';
	/** @type {import('mdast').Link} */
	export let node;
</script>

<a href={node.url} title={node.title}>
	<Children {node} />
</a>
