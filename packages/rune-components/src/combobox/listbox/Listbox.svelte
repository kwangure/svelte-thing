<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createListbox,
		type CreateListboxConfig,
	} from './createListbox.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	const { children, ...restProps }: HTMLAttributes<HTMLUListElement> =
		$props();
	const root = getRootContext<TRoot<unknown>>();
	const listbox = createListbox({
		root,
	} satisfies NullablyRequired<CreateListboxConfig<unknown>>);
</script>

<ul {...mergeProps(listbox.props, restProps)}>
	{@render children?.()}
</ul>
