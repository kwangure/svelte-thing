<script lang="ts">
	import type { TocEntry } from './types';
	import Heading from './heading.svelte';

	interface Props {
		activeTarget: string | undefined;
		toc: TocEntry[];
	}
	const { activeTarget, toc }: Props = $props();
</script>

{#if toc.length}
	<ul>
		{#each toc as heading}
			<Heading {activeTarget} self={heading} />
		{/each}
	</ul>
{/if}

<style>
	@layer component {
		ul {
			display: flex;
			flex-direction: column;
			gap: var(--st-size-1);
		}
	}
</style>
