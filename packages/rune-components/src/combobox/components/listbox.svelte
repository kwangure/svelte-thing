<script lang="ts">
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
