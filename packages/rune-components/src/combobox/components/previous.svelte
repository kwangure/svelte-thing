<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createComboboxPrevious,
		getComboboxContext,
		type CreateComboboxPreviousConfig,
	} from '../runes';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { ...restProps }: HTMLButtonAttributes = $props();
	const combobox = getComboboxContext();
	const previous = createComboboxPrevious({
		combobox,
	} satisfies NullablyRequired<CreateComboboxPreviousConfig<unknown>>);
</script>

<button {...mergeProps(previous.props, restProps)}>
	<span aria-hidden="true" style="padding: 0 2px;">◀</span>
</button>
