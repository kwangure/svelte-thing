<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createDialogClose,
		getDialogContext,
		type CreateDialogCloseConfig,
	} from '../runes';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { children, ...restProps }: HTMLButtonAttributes = $props();
	const dialog = getDialogContext();
	const close = createDialogClose({
		dialog,
	} satisfies NullablyRequired<CreateDialogCloseConfig>);
</script>

<button {...mergeProps(close.props, restProps)}>
	{@render children?.()}
</button>
