<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	const {
		'aria-hidden': ariaHidden = true,
		path,
		viewBox = '0 0 24 24',
		...restProps
	}: { path: string } & SVGAttributes<SVGElement> = $props();
</script>

<svg {...restProps} aria-hidden={ariaHidden} {viewBox}>
	<path d={path} />
</svg>

<style>
	@layer component {
		svg {
			height: var(--st-icon-height, var(--st-size-5));
			width: var(--st-icon-width, var(--st-size-5));
		}
		path {
			fill: var(--st-icon-fill, currentColor);
		}
	}
</style>
