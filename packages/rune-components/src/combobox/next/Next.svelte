<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import { createNext, type CreateNextConfig } from './createNext.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	interface Props extends HTMLButtonAttributes {
		root?: TRoot;
	}

	const { root = getRootContext(), ...restProps }: Props = $props();
	const next = createNext({ root } satisfies NullablyRequired<
		CreateNextConfig<unknown>
	>);
</script>

<button {...mergeProps(next.props, restProps)}>
	<span aria-hidden="true" style="padding: 0 2px;">▶</span>
</button>
