<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createTrigger,
		type CreateTriggerConfig,
	} from './createTrigger.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	const { children, ...restProps }: HTMLButtonAttributes = $props();
	const root = getRootContext<TRoot>();
	const trigger = createTrigger({
		root,
	} satisfies NullablyRequired<CreateTriggerConfig>);
</script>

<button {...mergeProps(trigger.props, restProps)}>
	{@render children?.()}
</button>
