<script lang="ts">
	import type { CreateItemConfig } from './createItem.svelte.js';
	import type { HTMLLiAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';
	import { createItem } from './createItem.svelte.js';
	import { getRootContext } from '../context.js';

	interface Props extends HTMLLiAttributes {
		root?: TRoot;
	}

	const { children, root = getRootContext(), ...restProps }: Props = $props();
	const item = createItem({
		root,
	} satisfies NullablyRequired<CreateItemConfig>);
</script>

<li {...mergeProps(item.props, restProps)} use:item.action>
	{@render children?.()}
</li>
