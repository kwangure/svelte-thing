<script lang="ts">
	import '../../css/breakpoint.css';
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';
	import type { NullablyRequired } from '../../types.js';
	import type { Snippet } from 'svelte';
	import {
		createListboxItem,
		getComboboxContext,
		type ComboboxListboxItem,
		type ComboboxOption,
		type CreateComboboxListboxItemConfig,
	} from '../runes';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import { mergeProps } from '@svelte-thing/component-utils';

	interface Props extends Omit<HTMLLiAttributes, 'children'> {
		children?: Snippet<[ComboboxListboxItem]>;
		item: ComboboxOption<unknown>;
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

<li {...mergeProps(listboxItem.props, restProps)} use:listboxItem.action>
	{@render children?.(listboxItem)}
</li>

<style>
	@layer component {
		li {
			align-items: center;
			border-radius: var(--st-size-1);
			display: grid;
			grid-column: 1 / -1;
			grid-template-columns: subgrid;
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
			background-color: var(
				--_background-color-dark,
				var(--st-color-blue-100)
			);
			--_color-dark: var(--st-color-preference-dark)
				var(--st-color-blue-700);
			color: var(--_color-dark, var(--st-color-blue-600));
		}
		li[data-active-item='true']:hover {
			--_background-color-dark: var(--st-color-preference-dark)
				var(--st-color-blue-100);
			background-color: var(
				--_background-color-dark,
				var(--st-color-blue-200)
			);
		}
	}
</style>
