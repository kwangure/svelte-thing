<script lang="ts">
	import '../css/code.css';

	interface Props {
		token: { color: string; segment: string };
	}

	let { token }: Props = $props();
</script>

<span class={token.color}>{token.segment}</span>
