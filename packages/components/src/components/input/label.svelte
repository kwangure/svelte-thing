<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLLabelAttributes {
		children: Snippet;
	}
	const { children, ...restProps }: Props = $props();
</script>

<label {...restProps}>
	{@render children()}
</label>

<style>
	label {
		display: flex;
		gap: var(--st-size-1);
	}
</style>
