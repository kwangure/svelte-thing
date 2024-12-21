<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import '../../css/size.css';

	const { children, ...restProps }: HTMLAttributes<HTMLUListElement> =
		$props();
</script>

<ul {...restProps}>{@render children?.()}</ul>

<style>
	@layer component {
		ul {
			padding-inline-start: var(--st-size-6);
			list-style-type: disc;
		}
	}
</style>
