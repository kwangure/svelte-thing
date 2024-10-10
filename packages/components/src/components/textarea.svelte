<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { uid } from 'uid';

	interface Props extends HTMLTextareaAttributes {
		label?: Snippet;
	}

	const { id = uid(), label, ...restProps }: Props = $props();
</script>

<div>
	{#if label}
		<label for={id}>
			{@render label?.()}
		</label>
	{/if}
	<textarea {id} {...restProps}></textarea>
</div>

<style>
	div {
		display: inline-flex;
		flex-direction: column;
		gap: var(--st-size-1);
	}
	textarea {
		--_border-color-dark: var(--st-color-preference-dark) #474b50;
		border: 1px solid var(--_border-color-dark, #c3c3c3);
		border-radius: var(--st-size-1);
		outline: 0;
		padding-block: var(--st-size-1);
		padding-inline: var(--st-size-2);
	}
	textarea:hover:not(:focus) {
		--_box-shadow-dark: var(--st-color-preference-dark)
			rgb(135 205 255 / 30%);
		box-shadow: 0 0 0px 2px var(--_box-shadow-dark, hsl(215deg 100% 90%));
		--_border-color-dark: var(--st-color-preference-dark)
			hsl(225deg 100% 60%);
		border: 1px solid var(--_border-color-dark, hsl(225deg 100% 55%));
	}
	textarea:focus {
		--_box-shadow-dark: var(--st-color-preference-dark) hsl(225deg 100% 60%);
		box-shadow: 0 0 0px 1px var(--_box-shadow-dark, hsl(225deg 100% 55%));
		--_border-color-dark: var(--st-color-preference-dark)
			hsl(225deg 100% 60%);
		border: 1px solid var(--_border-color-dark, hsl(225deg 100% 55%));
	}
</style>
