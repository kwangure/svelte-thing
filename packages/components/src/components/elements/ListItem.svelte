<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';

	const { children, ...restProps }: HTMLLiAttributes = $props();
</script>

<li {...restProps}>{@render children?.()}</li>

<style>
	@layer component {
		li {
			line-height: 2;
		}
	}
</style>
