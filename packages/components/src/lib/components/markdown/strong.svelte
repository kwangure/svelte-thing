<script>
	import Children from './children.svelte';
	/** @type {import('mdast').Strong} */
	export let node;
</script>

<strong><Children {node}/></strong>

