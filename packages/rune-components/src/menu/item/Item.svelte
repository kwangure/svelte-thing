<script lang="ts">
	import type { CreateItemConfig } from './createItem.svelte.js';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';
	import { createItem } from './createItem.svelte.js';
	import { getRootContext } from '../context.js';

	const { children, ...restProps }: HTMLLiAttributes = $props();
	const root = getRootContext();
	const item = createItem({
		root,
	} satisfies NullablyRequired<CreateItemConfig>);
</script>

<li {...mergeProps(item.props, restProps)} use:item.action>
	{@render children?.()}
</li>
