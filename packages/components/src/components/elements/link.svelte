<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import '../../css/color.css';
	import '../../css/size.css';

	const { children, ...restProps }: HTMLAnchorAttributes = $props();
</script>

<a {...restProps}>{@render children?.()}</a>

<style>
	a {
		color: var(--st-color-blue-500);
		text-underline-offset: var(--st-size-1);
		text-decoration-line: underline;
	}
	a:hover {
		text-decoration-thickness: var(--st-size-0_5);
	}
</style>
