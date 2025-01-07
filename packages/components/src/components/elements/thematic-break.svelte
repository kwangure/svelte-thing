<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	const props: HTMLAttributes<HTMLElement> = $props();
</script>

<div {...props}></div>

<style>
	@layer component {
		div {
			--_border-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-600);
			border-color: var(
				--_border-color-dark,
				var(--st-color-neutral-300)
			);
			border-inline-end: 1px;
			margin-block: var(--st-size-8);
		}
	}
</style>
