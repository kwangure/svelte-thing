<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	const { children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<em {...restProps}>{@render children?.()}</em>
