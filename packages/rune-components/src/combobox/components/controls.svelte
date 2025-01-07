<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	const { children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-st-combobox-controls {...restProps}>
	{@render children?.()}
</div>
