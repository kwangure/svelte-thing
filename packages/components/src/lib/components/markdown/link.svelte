<script>
	import Children from './children.svelte';
	/** @type {import('mdast').Link} */
	export let node;
</script>

<a class="text-blue-500" href={node.url} title={node.title}>
	<Children {node} />
</a>

<style>
	a {
		text-underline-offset: 4px;
		text-decoration-line: underline;
	}
	a:hover {
		text-decoration-thickness: 2px;
	}
</style>
