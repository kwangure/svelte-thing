<script lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/root.svelte.js';
	import {
		createNonModalPopup,
		type CreateNonModalPopupConfig,
	} from './non-modal-popup.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { children, ...restProps }: HTMLDialogAttributes = $props();
	const root = getRootContext<TRoot>();
	const popup = createNonModalPopup({
		root,
	} satisfies NullablyRequired<CreateNonModalPopupConfig>);
</script>

<dialog {...mergeProps(popup.props, restProps)} use:popup.action>
	{@render children?.()}
</dialog>
