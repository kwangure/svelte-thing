<script>
	import Heading from './heading.svelte';

	/** @type {string | undefined} */
	export let activeTarget;
	/** @type {import('./types.js').TocEntry[]} */
	export let toc;
</script>

{#if toc.length}
	<ul>
		{#each toc as heading}
			<Heading {activeTarget} self={heading} />
		{/each}
	</ul>
{/if}

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: var(--st-size-1);
	}
</style>
