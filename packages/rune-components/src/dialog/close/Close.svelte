<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createClose,
		type CreateCloseConfig,
	} from './createClose.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	const { children, ...restProps }: HTMLButtonAttributes = $props();
	const root = getRootContext<TRoot>();
	const close = createClose({
		root,
	} satisfies NullablyRequired<CreateCloseConfig>);
</script>

<button {...mergeProps(close.props, restProps)}>
	{@render children?.()}
</button>
