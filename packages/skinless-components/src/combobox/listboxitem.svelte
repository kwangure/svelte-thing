<script lang="ts">
	/* eslint-disable no-undef */
	import '@svelte-thing/components/css/breakpoint';
	import '@svelte-thing/components/css/size';
	import type { NullablyRequired } from '../types.js';
	import {
		createListboxItem,
		getComboboxContext,
		type CreateComboboxListboxItemConfig,
	} from '@svelte-thing/builders';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import { mergeProps } from '@svelte-thing/component-utils';

	interface Props extends HTMLLiAttributes {
		item: unknown;
	}

	const { children, item, ...restProps }: Props = $props();
	const combobox = getComboboxContext();
	const listboxItem = createListboxItem({
		combobox,
		get item() {
			return item;
		},
	} satisfies NullablyRequired<CreateComboboxListboxItemConfig<unknown>>);
</script>

<li {...mergeProps(restProps, listboxItem.props)} use:listboxItem.action>
	{@render children?.()}
</li>

<style>
	li {
		align-items: center;
		border-radius: var(--st-size-1);
		display: flex;
		gap: var(--st-size-3);
		padding-block: var(--st-size-1);
		padding-inline: var(--st-size-2);
	}
	li:hover {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		background-color: var(
			--_background-color-dark,
			var(--st-color-neutral-200)
		);
	}
	li[data-active-item='true'] {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-blue-200);
		background-color: var(--_background-color-dark, var(--st-color-blue-100));
		--_color-dark: var(--st-color-preference-dark) var(--st-color-blue-700);
		color: var(--_color-dark, var(--st-color-blue-600));
	}
	li[data-active-item='true']:hover {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-blue-100);
		background-color: var(--_background-color-dark, var(--st-color-blue-200));
	}
</style>
