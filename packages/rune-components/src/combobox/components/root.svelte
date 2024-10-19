<script module>
	import type { CreateComboboxRootConfig, ComboboxRoot } from '../runes';

	type DivAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

	interface Props<TValue>
		extends CreateComboboxRootConfig<TValue>,
			DivAttributes {
		children: Snippet<[ComboboxRoot<TValue>]>;
	}
</script>

<script lang="ts" generics="TValue">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { Snippet } from 'svelte';
	import { mergeProps } from '@svelte-thing/component-utils';
	import { setComboboxContext } from '../runes';
	import { skipEffect } from '@svelte-thing/component-utils/reactivity';

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
	const combobox = setComboboxContext<TValue>({
		hasInputCompletion,
		includesBaseElement,
		isOpen,
		options,
		optionToString,
		value,
	} satisfies NullablyRequired<CreateComboboxRootConfig<TValue>>);

	skipEffect(
		() => isOpen,
		(i) => (i ? combobox.open() : combobox.close()),
	);
	skipEffect(
		() => options,
		(o) => combobox.setOptions(o),
	);
	skipEffect(
		() => value,
		(v) => combobox.setValue(v),
	);
</script>

<div {...mergeProps(combobox.props, restProps)} use:combobox.action>
	{@render children(combobox)}
</div>

<style>
	div {
		display: inline-flex;
		flex-direction: column;
	}
</style>
