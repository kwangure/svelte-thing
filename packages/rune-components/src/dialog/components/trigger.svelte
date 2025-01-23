<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createDialogTrigger,
		getDialogContext,
		type CreateDialogTriggerConfig,
	} from '../runes';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { children, ...restProps }: HTMLButtonAttributes = $props();
	const dialog = getDialogContext();
	const trigger = createDialogTrigger({
		dialog,
	} satisfies NullablyRequired<CreateDialogTriggerConfig>);
</script>

<button {...mergeProps(trigger.props, restProps)}>
	{@render children?.()}
</button>
