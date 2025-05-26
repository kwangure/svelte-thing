<script lang="ts">
	import type { CreateRootConfig, TRoot } from './createRoot.svelte.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { Snippet } from 'svelte';
	import { createRoot } from './createRoot.svelte.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';
	import { setRootContext } from '../context.js';

	type DivAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

	interface Props extends DivAttributes {
		children: Snippet<[TRoot]>;
	}

	const { children, ...restProps }: Props = $props();
	const root = setRootContext(
		createRoot({} satisfies NullablyRequired<CreateRootConfig>),
	);
</script>

<div {...mergeProps(root.props, restProps)} use:root.action>
	{@render children?.(root)}
</div>

<style>
	div {
		display: contents;
	}
</style>
