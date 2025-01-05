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
	import { skip, watch } from '@svelte-thing/component-utils/reactivity';
	import { mergeProps } from '@svelte-thing/component-utils';
	import { setComboboxContext } from '../runes';

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

	watch(
		() => isOpen,
		(i) => (i ? combobox.open() : combobox.close()),
		skip(1),
	);
	watch(
		() => options,
		(o) => combobox.setOptions(o),
		skip(1),
	);
	watch(
		() => value,
		(v) => combobox.setValue(v),
		skip(1),
	);
</script>

<div {...mergeProps(combobox.props, restProps)} use:combobox.action>
	{@render children(combobox)}
</div>

<style>
	@layer component {
		div {
			display: inline-flex;
			flex-direction: column;
		}
	}
</style>
