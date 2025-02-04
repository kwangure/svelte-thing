<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/root.svelte.js';
	import { createNext, type CreateNextConfig } from './next.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { ...restProps }: HTMLButtonAttributes = $props();
	const root = getRootContext<TRoot<unknown>>();
	const next = createNext({ root } satisfies NullablyRequired<
		CreateNextConfig<unknown>
	>);
</script>

<button {...mergeProps(next.props, restProps)}>
	<span aria-hidden="true" style="padding: 0 2px;">▶</span>
</button>
