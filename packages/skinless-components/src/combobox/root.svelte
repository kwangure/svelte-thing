<script lang="ts" generics="TOptions extends Iterable<any>, TFilter">
	/* eslint-disable no-undef, @typescript-eslint/no-explicit-any */
	import type { Snippet } from 'svelte';
	import { setComboboxContext } from './context';
	import type {
		ComboboxOption,
		InferIterableValue,
	} from '@svelte-thing/builders';

	const {
		children,
		filter,
		hasInputCompletion,
		label,
		onchange,
		options,
		setInputValue,
	}: {
		children: Snippet<[typeof combobox]>;
		filter?: TFilter;
		hasInputCompletion?: false | undefined;
		label: string;
		onchange?: (value: ComboboxOption<TOptions, TFilter> | undefined) => void;
		options?: TOptions;
		setInputValue?: (
			selectedValue: TFilter extends (...args: any) => any
				? InferIterableValue<ReturnType<TFilter>>
				: InferIterableValue<TOptions>,
		) => string;
	} = $props();
	const combobox = setComboboxContext<TOptions, TFilter>({
		filter,
		hasInputCompletion,
		label,
		options,
		onchange,
		setInputValue,
	});
</script>

<div class="root" {...combobox.properties} use:combobox.action>
	{@render children(combobox)}
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
	}
</style>
