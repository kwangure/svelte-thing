<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import {
		createComboboxLabel,
		getComboboxContext,
	} from '@svelte-thing/builders';
	import { mergeProps } from '@svelte-thing/component-utils';

	interface Props extends HTMLLabelAttributes {
		children?: Snippet;
	}

	const { children, ...restProps }: Props = $props();
	const combobox = getComboboxContext();
	const label = createComboboxLabel({ combobox });
</script>

<label {...mergeProps(restProps, label.props)}>
	{#if children}
		{@render children()}
	{:else}
		{combobox.label}
	{/if}
</label>
