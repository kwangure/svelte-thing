<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createLabel,
		type CreateLabelConfig,
	} from './createLabel.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { children, ...restProps }: HTMLLabelAttributes = $props();
	const root = getRootContext<TRoot<unknown>>();
	const label = createLabel({ root } satisfies NullablyRequired<
		CreateLabelConfig<unknown>
	>);
</script>

<label {...mergeProps(label.props, restProps)}>
	{@render children?.()}
</label>
