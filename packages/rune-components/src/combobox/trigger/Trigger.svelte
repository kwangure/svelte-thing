<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createTrigger,
		type CreateTriggerConfig,
	} from './createTrigger.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { ...restProps }: HTMLButtonAttributes = $props();
	const root = getRootContext<TRoot<unknown>>();
	const trigger = createTrigger({ root } satisfies NullablyRequired<
		CreateTriggerConfig<unknown>
	>);
</script>

<button {...mergeProps(trigger.props, restProps)}>
	<span aria-hidden="true" style="padding: 0 2px;">▼</span>
</button>
