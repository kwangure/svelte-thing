<script lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types.js';
	import {
		createDialogPopup,
		getDialogContext,
		type CreateDialogPopupConfig,
	} from '../runes/index.js';
	import { mergeProps } from '@svelte-thing/component-utils';

	const { children, ...restProps }: HTMLDialogAttributes = $props();
	const dialog = getDialogContext();
	const popup = createDialogPopup({
		dialog,
	} satisfies NullablyRequired<CreateDialogPopupConfig>);
</script>

<dialog {...mergeProps(popup.props, restProps)} use:popup.action>
	{@render children?.()}
</dialog>
