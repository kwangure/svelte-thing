<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createInput,
		type CreateInputConfig,
	} from './createInput.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	interface Props extends HTMLInputAttributes {
		root?: TRoot;
	}

	const { root = getRootContext(), ...restProps }: Props = $props();
	const input = createInput({ root } satisfies NullablyRequired<
		CreateInputConfig<unknown>
	>);
</script>

<input {...mergeProps(input.props, restProps)} use:input.action />
