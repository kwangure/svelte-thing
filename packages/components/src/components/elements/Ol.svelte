<script lang="ts">
	import type { HTMLOlAttributes } from 'svelte/elements';

	const { children, ...restProps }: HTMLOlAttributes = $props();
</script>

<ol {...restProps}>{@render children?.()}</ol>

<style>
	@layer component {
		ol {
			padding-inline-start: var(--st-size-6);
			list-style-type: decimal;
		}
	}
</style>
