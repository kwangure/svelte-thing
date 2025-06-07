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

	interface Props extends HTMLAttributes<HTMLUListElement> {
		root?: TRoot;
	}

	const { children, root = getRootContext(), ...restProps }: Props = $props();
	const listbox = createListbox({
		root,
	} satisfies NullablyRequired<CreateListboxConfig<unknown>>);
</script>

<ul {...mergeProps(listbox.props, restProps)}>
	{@render children?.()}
</ul>
