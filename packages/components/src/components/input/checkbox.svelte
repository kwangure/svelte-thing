<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLInputAttributes {
		label: Snippet;
		type?: 'checkbox';
	}
	const { label, ...restProps }: Props = $props();
</script>

<label>
	<input type="checkbox" {...restProps} />
	{@render label()}
</label>

<style>
	label {
		display: flex;
		gap: var(--st-size-1);
	}
</style>
