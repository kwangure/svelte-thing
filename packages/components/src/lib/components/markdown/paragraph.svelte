<script>
	import '../../css/size.css';
	import Children from './children.svelte';
	/** @type {import('mdast').Paragraph} */
	export let node;
</script>

<p class="mb-4 leading-7">
	<Children {node} />
</p>

<style>
	p {
		line-height: var(--st-size-7);
		margin-block-end: var(--st-size-4);
	}
</style>
