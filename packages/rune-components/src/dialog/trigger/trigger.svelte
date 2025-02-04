<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createTrigger,
		type CreateTriggerConfig,
	} from './trigger.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils';
	import type { TRoot } from '../root/root.svelte.js';

	const { children, ...restProps }: HTMLButtonAttributes = $props();
	const root = getRootContext<TRoot>();
	const trigger = createTrigger({
		root,
	} satisfies NullablyRequired<CreateTriggerConfig>);
</script>

<button {...mergeProps(trigger.props, restProps)}>
	{@render children?.()}
</button>
