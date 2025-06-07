<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createPopup,
		type CreatePopupConfig,
	} from './createPopup.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	interface Props extends HTMLAttributes<HTMLUListElement> {
		root?: TRoot;
	}

	const { children, root = getRootContext(), ...restProps }: Props = $props();
	const popup = createPopup({
		root,
	} satisfies NullablyRequired<CreatePopupConfig>);
</script>

<ul {...mergeProps(popup.props, restProps)}>
	{@render children?.()}
</ul>
