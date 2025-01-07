<script lang="ts">
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
