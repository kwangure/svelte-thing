<script lang>
	import '../code/code.css';

	/** @type {import('../code/highlight.js').HighlightResult}*/
	export let token;
</script>

<span class={token.color}>{token.segment}</span>
