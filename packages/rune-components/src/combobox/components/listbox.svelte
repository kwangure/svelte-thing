<script lang="ts">
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createComboboxListbox,
		getComboboxContext,
		type CreateComboboxListboxConfig,
	} from '../runes';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { children, ...restProps }: HTMLAttributes<HTMLUListElement> =
		$props();
	const combobox = getComboboxContext();
	const listbox = createComboboxListbox({
		combobox,
	} satisfies NullablyRequired<CreateComboboxListboxConfig<unknown>>);
</script>

<ul {...mergeProps(listbox.props, restProps)}>
	{@render children?.()}
</ul>

<style>
	@layer component {
		ul {
			--_background-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-800);
			background-color: var(
				--_background-color-dark,
				var(--st-color-white)
			);
			--_border-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-600);
			border-color: var(
				--_border-color-dark,
				var(--st-color-neutral-300)
			);
			border-radius: var(--st-size-1);
			border-width: 1px;
			--_box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
				0 4px 6px -4px rgb(0 0 0 / 0.1);
			--_box-shadow-dark: var(--st-color-preference-dark) 0 10px 15px -3px
					rgb(0 0 0 / 0.25),
				0 4px 6px -4px rgb(0 0 0 / 0.1);
			box-shadow: var(--_box-shadow-dark, var(--_box-shadow));
			display: grid;
			grid-template-columns: auto minmax(0, 1fr);
			min-width: var(--st-size-40);
			padding: var(--st-size-2);
		}
	}
</style>
