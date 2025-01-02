<script lang="ts">
	import '../../css/size.css';
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

<style>
	@layer component {
		@layer component {
			input {
				background-color: transparent;
				border: none;
				flex-grow: 1;
				outline: 0;
				padding-block: var(--st-size-1);
				padding-inline: 12px var(--st-size-2);
			}
		}
	}
</style>
