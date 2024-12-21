<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { uid } from 'uid';

	interface FieldData {
		id: string;
	}
	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		children: Snippet<[FieldData]>;
	}
	const { children, ...restProps }: Props = $props();
	const data: FieldData = { id: uid() };
</script>

<div {...restProps}>
	{@render children(data)}
</div>

<style>
	@layer component {
		div {
			display: inline-flex;
			flex-direction: column;
			gap: var(--st-size-1);
		}
	}
</style>
