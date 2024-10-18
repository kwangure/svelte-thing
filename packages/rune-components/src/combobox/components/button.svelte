<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createComboboxButton,
		getComboboxContext,
		type CreateComboboxButtonConfig,
	} from '../runes';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { ...restProps }: HTMLButtonAttributes = $props();
	const combobox = getComboboxContext();
	const button = createComboboxButton({ combobox } satisfies NullablyRequired<
		CreateComboboxButtonConfig<unknown>
	>);
</script>

<button {...mergeProps(restProps, button.props)}>
	<span aria-hidden="true" style="padding: 0 2px;">▼</span>
</button>

<style>
	:global(div:hover):has(> button) button,
	:global(div:focus-within):has(> button) button {
		--_color-dark: var(--st-color-preference-dark) inherit;
		color: var(--_color-dark, hsl(225deg 100% 55%));
		--_background-color-dark: var(--st-color-preference-dark)
			hsl(225deg 100% 60%);
		background-color: var(--_background-color-dark, hsl(215deg 100% 90%));
		transition:
			background-color 0.25s ease,
			color 0.25s ease;
	}
	button {
		align-items: center;
		justify-content: center;
		background-color: transparent;
		color: inherit;
		display: flex;
		height: var(--st-size-8);
		width: var(--st-size-8);
		border-radius: 0 var(--st-size-0_5) var(--st-size-0_5) 0;
		user-select: none;
	}
</style>
