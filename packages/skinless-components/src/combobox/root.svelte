<script module>
	import type {
		createCombobox,
		CreateCombmboxConfig,
	} from '@svelte-thing/builders';

	type DivAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

	interface Props<TOption>
		extends CreateCombmboxConfig<TOption>,
			DivAttributes {
		children: Snippet<[ReturnType<typeof createCombobox<TOption>>]>;
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

<div
	class="root"
	{...mergeProps(restProps, combobox.properties)}
	use:combobox.action
>
	{@render children(combobox)}
</div>

<style>
	.root {
		display: inline-flex;
		flex-direction: column;
	}
</style>
