<script lang="ts">
	import '../css/code.css';

	export let token: { color: string; segment: string };
</script>

<span class={token.color}>{token.segment}</span>
