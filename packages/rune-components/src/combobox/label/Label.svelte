<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createLabel,
		type CreateLabelConfig,
	} from './createLabel.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	interface Props extends HTMLLabelAttributes {
		root?: TRoot;
	}

	const { children, root = getRootContext(), ...restProps }: Props = $props();
	const label = createLabel({ root } satisfies NullablyRequired<
		CreateLabelConfig<unknown>
	>);
</script>

<label {...mergeProps(label.props, restProps)}>
	{@render children?.()}
</label>
