<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	const { children, ...restProps }: HTMLAttributes<HTMLParagraphElement> =
		$props();
</script>

<p {...restProps}>{@render children?.()}</p>

<style>
	@layer component {
		p {
			line-height: 2;
			margin-block-end: var(--st-size-4);
		}
	}
</style>
