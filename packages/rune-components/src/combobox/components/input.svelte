<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createComboboxInput,
		getComboboxContext,
		type CreateComboboxInputConfig,
	} from '../runes';
	import { mergeProps } from '@svelte-thing/component-utils';

	const props: HTMLInputAttributes = $props();
	const combobox = getComboboxContext();
	const input = createComboboxInput({ combobox } satisfies NullablyRequired<
		CreateComboboxInputConfig<unknown>
	>);
</script>

<input {...mergeProps(input.props, props)} use:input.action />
