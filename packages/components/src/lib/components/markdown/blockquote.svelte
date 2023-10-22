<script>
	import Children from './children.svelte';

	/** @type {import('mdast').Blockquote} */
	export let node;
</script>

<blockquote><Children {node}/></blockquote>
