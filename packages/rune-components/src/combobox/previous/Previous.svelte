<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createPrevious,
		type CreatePreviousConfig,
	} from './createPrevious.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	const { ...restProps }: HTMLButtonAttributes = $props();
	const root = getRootContext<TRoot<unknown>>();
	const previous = createPrevious({
		root,
	} satisfies NullablyRequired<CreatePreviousConfig<unknown>>);
</script>

<button {...mergeProps(previous.props, restProps)}>
	<span aria-hidden="true" style="padding: 0 2px;">◀</span>
</button>
