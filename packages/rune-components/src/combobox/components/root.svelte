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
		label,
		options,
		optionToString,
		value,
		...restProps
	}: Props<TValue> = $props();
	const combobox = setComboboxContext<TValue>({
		hasInputCompletion,
		includesBaseElement,
		isOpen,
		label,
		options,
		optionToString,
		value,
	} satisfies NullablyRequired<CreateComboboxRootConfig<TValue>>);

	skipEffect(
		() => isOpen,
		(isOpen2) => {
			if (isOpen2) {
				combobox.open();
			} else {
				combobox.close();
			}
		},
	);
	skipEffect(
		() => options,
		(v) => combobox.setOptions(v),
	);
	skipEffect(
		() => value,
		(v) => combobox.setValue(v),
	);
</script>

<div {...mergeProps(restProps, combobox.props)} use:combobox.action>
	{@render children(combobox)}
</div>

<style>
	div {
		display: inline-flex;
		flex-direction: column;
	}
</style>
