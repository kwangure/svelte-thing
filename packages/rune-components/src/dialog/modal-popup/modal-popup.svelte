<script lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/root.svelte.js';
	import {
		createModalPopup,
		type CreateModalPopupConfig,
	} from './modal-popup.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { children, ...restProps }: HTMLDialogAttributes = $props();
	const root = getRootContext<TRoot>();
	const popup = createModalPopup({
		root,
	} satisfies NullablyRequired<CreateModalPopupConfig>);
</script>

<dialog {...mergeProps(popup.props, restProps)} use:popup.action>
	{@render children?.()}
</dialog>
