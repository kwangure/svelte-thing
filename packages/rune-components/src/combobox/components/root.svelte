<script module>
	import type { CreateComboboxRootConfig, ComboboxRoot } from '../runes';

	type DivAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

	interface Props<TOption>
		extends CreateComboboxRootConfig<TOption>,
			DivAttributes {
		children: Snippet<[ComboboxRoot<TOption>]>;
	}
</script>

<script lang="ts" generics="TOption">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { Snippet } from 'svelte';
	import { mergeProps } from '@svelte-thing/component-utils';
	import { setComboboxContext } from '../runes';
	import { skipEffect } from '@svelte-thing/component-utils/reactivity';

	const {
		children,
		filter,
		hasInputCompletion,
		includesBaseElement,
		isOpen,
		label,
		options,
		optionToString,
		value,
		...restProps
	}: Props<TOption> = $props();
	const combobox = setComboboxContext<TOption>({
		filter,
		hasInputCompletion,
		includesBaseElement,
		isOpen,
		label,
		options,
		optionToString,
		value,
	} satisfies NullablyRequired<CreateComboboxRootConfig<TOption>>);

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
