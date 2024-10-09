<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../types.js';
	import type { Snippet } from 'svelte';
	import {
		createComboboxLabel,
		getComboboxContext,
		type CreateComboboxLabelConfig,
	} from '@svelte-thing/builders';
	import { mergeProps } from '@svelte-thing/component-utils';

	interface Props extends HTMLLabelAttributes {
		children?: Snippet;
	}

	const { children, ...restProps }: Props = $props();
	const combobox = getComboboxContext();
	const label = createComboboxLabel({ combobox } satisfies NullablyRequired<
		CreateComboboxLabelConfig<unknown>
	>);
</script>

<label {...mergeProps(restProps, label.props)}>
	{#if children}
		{@render children()}
	{:else}
		{combobox.label}
	{/if}
</label>
