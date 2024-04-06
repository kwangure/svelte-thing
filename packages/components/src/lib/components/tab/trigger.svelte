<script lang="ts">
	import { getTabContext } from './tab';

	export let id: string;
	const { elements, states } = getTabContext();
	const { trigger } = elements;
	const { value } = states;
</script>

<button {...$trigger(id)} use:trigger>
	<slot />
	{#if $value === id}
		<div />
	{/if}
</button>

<style>
	button {
		position: relative;
		padding-block: var(--st-size-2);
		padding-inline: var(--st-size-2);
	}
	div {
		--_background-color-dark: var(--st-color-preference-dark)
			hsl(225deg 100% 60%);
		background-color: var(--_background-color-dark, hsl(225deg 100% 55%));
		border-radius: var(--st-size-1);
		bottom: 0;
		left: 0;
		height: 0.1875rem;
		position: absolute;
		width: 100%;
	}
</style>
