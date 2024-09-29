<script lang>
	import '../code/code.css';

	/** @type {{ color: string, segment: string }}*/
	export let token;
</script>

<span class={token.color}>{token.segment}</span>
