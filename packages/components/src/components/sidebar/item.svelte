<script lang="ts">
	import '../../css/size.css';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLLiAttributes {
		children: Snippet;
	}

	const { children, ...restProps }: Props = $props();
</script>

<li {...restProps}>{@render children?.()}</li>

<style>
	@layer component {
		li {
			display: flex;
			flex-direction: column;
			gap: var(--st-size-1);
		}
	}
</style>
