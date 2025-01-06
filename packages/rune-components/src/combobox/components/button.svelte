<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createComboboxButton,
		getComboboxContext,
		type CreateComboboxButtonConfig,
	} from '../runes';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { ...restProps }: HTMLButtonAttributes = $props();
	const combobox = getComboboxContext();
	const button = createComboboxButton({ combobox } satisfies NullablyRequired<
		CreateComboboxButtonConfig<unknown>
	>);
</script>

<button {...mergeProps(button.props, restProps)}>
	<span aria-hidden="true" style="padding: 0 2px;">▼</span>
</button>
