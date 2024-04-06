<script lang="ts">
	import { getTabContext } from './tab';

	export let id: string;
	const { elements, states } = getTabContext();
	const { content } = elements;
	const { value } = states;
</script>

{#if $value === id}
	<div {...$content(id)} use:content>
		<slot />
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
	}
</style>
