<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createComboboxLabel,
		getComboboxContext,
		type CreateComboboxLabelConfig,
	} from '../runes';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { children, ...restProps }: HTMLLabelAttributes = $props();
	const combobox = getComboboxContext();
	const label = createComboboxLabel({ combobox } satisfies NullablyRequired<
		CreateComboboxLabelConfig<unknown>
	>);
</script>

<label {...mergeProps(label.props, restProps)}>
	{@render children?.()}
</label>
