<script lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import type { TRoot } from '../root/createRoot.svelte.js';
	import {
		createNonModalPopup,
		type CreateNonModalPopupConfig,
	} from './createNonModalPopup.svelte.js';
	import { getRootContext } from '../context.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	interface Props extends HTMLDialogAttributes {
		root?: TRoot;
	}

	const { children, root = getRootContext(), ...restProps }: Props = $props();
	const popup = createNonModalPopup({
		root,
	} satisfies NullablyRequired<CreateNonModalPopupConfig>);
</script>

<dialog {...mergeProps(popup.props, restProps)} use:popup.action>
	{@render children?.()}
</dialog>
