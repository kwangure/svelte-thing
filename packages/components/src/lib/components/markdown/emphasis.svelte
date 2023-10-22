<script>
	import Children from './children.svelte';
	/** @type {import('mdast').Emphasis} */
	export let node;
</script>

<em><Children {node}/></em>

