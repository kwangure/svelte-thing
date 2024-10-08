<script module>
	import type {
		CreateCombmboxRootConfig,
		ComboboxRoot,
	} from '@svelte-thing/builders';

	type DivAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

	interface Props<TOption>
		extends CreateCombmboxRootConfig<TOption>,
			DivAttributes {
		children: Snippet<[ComboboxRoot<TOption>]>;
	}
</script>

<script lang="ts" generics="TOption">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { mergeProps } from '@svelte-thing/component-utils';
	import { setComboboxContext } from '@svelte-thing/builders';

	const {
		children,
		filter,
		hasInputCompletion,
		includesBaseElement,
		label,
		options,
		setInputValue,
		...restProps
	}: Props<TOption> = $props();
	const combobox = setComboboxContext<TOption>({
		filter,
		hasInputCompletion,
		includesBaseElement,
		label,
		options,
		setInputValue,
	});
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
