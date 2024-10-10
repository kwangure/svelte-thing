<script lang="ts">
	import type { HTMLFormAttributes } from 'svelte/elements';

	const { children, ...restProps }: HTMLFormAttributes = $props();
</script>

<form {...restProps}>
	<!--
		Allow `undefined` children. Inputs can be defined outside the form but
		reference it by `id` using the "form" attribute
	-->
	{@render children?.()}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: var(--st-size-2);
	}
</style>
