<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createComboboxNext,
		getComboboxContext,
		type CreateComboboxNextConfig,
	} from '../runes';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { ...restProps }: HTMLButtonAttributes = $props();
	const combobox = getComboboxContext();
	const next = createComboboxNext({ combobox } satisfies NullablyRequired<
		CreateComboboxNextConfig<unknown>
	>);
</script>

<button {...mergeProps(next.props, restProps)}>
	<span aria-hidden="true" style="padding: 0 2px;">▶</span>
</button>
