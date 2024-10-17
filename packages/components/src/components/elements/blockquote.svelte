<script lang="ts">
	import type { HTMLBlockquoteAttributes } from 'svelte/elements';

	const { children, ...restProps }: HTMLBlockquoteAttributes = $props();
</script>

<blockquote {...restProps}>{@render children?.()}</blockquote>
