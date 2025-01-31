<script lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createModalDialogPopup,
		getDialogContext,
		type CreateModalDialogPopupConfig,
	} from '../runes/index.js';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { children, ...restProps }: HTMLDialogAttributes = $props();
	const dialog = getDialogContext();
	const popup = createModalDialogPopup({
		dialog,
	} satisfies NullablyRequired<CreateModalDialogPopupConfig>);
</script>

<dialog {...mergeProps(popup.props, restProps)} use:popup.action>
	{@render children?.()}
</dialog>
