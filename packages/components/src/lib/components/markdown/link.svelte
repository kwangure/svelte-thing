<script>
	import '../../css/color.css';
	import Children from './children.svelte';
	/** @type {import('mdast').Link} */
	export let node;
</script>

<a href={node.url} title={node.title}>
	<Children {node} />
</a>

<style>
	a {
		color: var(--st-color-blue-500);
		text-underline-offset: 4px;
		text-decoration-line: underline;
	}
	a:hover {
		text-decoration-thickness: 2px;
	}
</style>
