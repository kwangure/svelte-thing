<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { Option } from '../root/createRoot.svelte.js';
	import type { Snippet } from 'svelte';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createListboxItem,
		type TListboxItem,
		type CreateListboxItemConfig,
	} from './createListboxItem.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils';

	interface Props extends Omit<HTMLLiAttributes, 'children'> {
		children?: Snippet<[TListboxItem]>;
		item: Option<unknown>;
	}

	const { children, item, ...restProps }: Props = $props();
	const root = getRootContext<TRoot<unknown>>();
	const listboxItem = createListboxItem({
		root,
		get item() {
			return item;
		},
	} satisfies NullablyRequired<CreateListboxItemConfig<unknown>>);
</script>

<li {...mergeProps(listboxItem.props, restProps)} use:listboxItem.action>
	{@render children?.(listboxItem)}
</li>
