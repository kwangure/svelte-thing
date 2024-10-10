<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: Snippet;
		type?: 'radio';
	}

	const { label, ...restProps }: Props = $props();
</script>

<label>
	<input type="radio" {...restProps} />
	{@render label()}
</label>

<style>
	label {
		display: flex;
		gap: var(--st-size-1);
	}
</style>
