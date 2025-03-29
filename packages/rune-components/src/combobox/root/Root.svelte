<script module>
	import type { CreateRootConfig, TRoot } from './createRoot.svelte.js';

	type DivAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

	interface Props<TValue> extends CreateRootConfig<TValue>, DivAttributes {
		children: Snippet<[TRoot<TValue>]>;
	}
</script>

<script lang="ts" generics="TValue">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { Snippet } from 'svelte';
	import {
		mergeProps,
		skip,
		watch,
	} from '@svelte-thing/component-utils/svelte';
	import { createRoot } from './createRoot.svelte.js';
	import { setRootContext } from '../context.js';

	const {
		children,
		hasInputCompletion,
		includesBaseElement,
		isOpen,
		options,
		optionToString,
		value,
		...restProps
	}: Props<TValue> = $props();
	const root = setRootContext(
		createRoot({
			hasInputCompletion,
			includesBaseElement,
			isOpen,
			options,
			optionToString,
			value,
		} satisfies NullablyRequired<CreateRootConfig<TValue>>),
	);

	watch(
		() => isOpen,
		(i) => (i ? root.open() : root.close()),
		skip(1),
	);
	watch(
		() => options,
		(o) => root.setOptions(o),
		skip(1),
	);
	watch(
		() => value,
		(v) => root.setValue(v),
		skip(1),
	);
</script>

<div {...mergeProps(root.props, restProps)} use:root.action>
	{@render children(root)}
</div>
