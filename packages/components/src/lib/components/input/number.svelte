<script lang="ts">
	import { uid } from 'uid';

	export let id = uid();
	export let max: number | undefined = undefined;
	export let min: number | undefined = undefined;
	/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any */
	export let onchange: ((...args: any[]) => any) | undefined = undefined;
	/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any */
	export let oninput: ((...args: any[]) => any) | undefined = undefined;
	export let value: number | undefined = undefined;
</script>

<div>
	<label for={id}><slot /></label>
	<input
		{id}
		{max}
		{min}
		type="number"
		{value}
		on:change={onchange}
		on:input={oninput}
	/>
</div>

<style>
	div {
		display: inline-flex;
		flex-direction: column;
		gap: var(--st-size-1);
	}
	input {
		--_border-color-dark: var(--st-color-preference-dark) #474b50;
		border: 1px solid var(--_border-color-dark, #c3c3c3);
		border-radius: var(--st-size-1);
		outline: 0;
		padding-block: var(--st-size-1);
		padding-inline: var(--st-size-2);
	}
	input:hover:not(:focus) {
		--_box-shadow-dark: var(--st-color-preference-dark) rgb(135 205 255 / 30%);
		box-shadow: 0 0 0px 2px var(--_box-shadow-dark, hsl(215deg 100% 90%));
		--_border-color-dark: var(--st-color-preference-dark) hsl(225deg 100% 60%);
		border: 1px solid var(--_border-color-dark, hsl(225deg 100% 55%));
	}
	input:focus {
		--_box-shadow-dark: var(--st-color-preference-dark) hsl(225deg 100% 60%);
		box-shadow: 0 0 0px 1px var(--_box-shadow-dark, hsl(225deg 100% 55%));
		--_border-color-dark: var(--st-color-preference-dark) hsl(225deg 100% 60%);
		border: 1px solid var(--_border-color-dark, hsl(225deg 100% 55%));
	}
</style>
