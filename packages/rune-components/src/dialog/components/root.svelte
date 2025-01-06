<!--
	@component

	Dialog presents a dialog box or modal.
-->
<script lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types';
	import {
		createDialogRoot,
		type CreateDialogRootConfig,
	} from '../runes/root.svelte.js';
	import { mergeProps } from '@svelte-thing/component-utils';
	import { skip, watch } from '@svelte-thing/component-utils/reactivity';

	interface Props
		extends CreateDialogRootConfig,
			Omit<HTMLDialogAttributes, 'open'> {}
	const {
		children,
		hideOnInteractOutside,
		isModal,
		isOpen,
		...restProps
	}: Props = $props();

	const dialog = createDialogRoot({
		hideOnInteractOutside,
		isModal,
		isOpen,
	} satisfies NullablyRequired<CreateDialogRootConfig>);
	watch(
		() => hideOnInteractOutside,
		(h) => dialog.setHideOnInteractOutside(h),
		skip(1),
	);
	watch(
		() => isModal,
		(i) => dialog.setIsModal(i),
		skip(1),
	);
	watch(
		() => isOpen,
		(i) => (i ? dialog.open() : dialog.close()),
		skip(1),
	);
</script>

<dialog {...mergeProps(dialog.props, restProps)} use:dialog.action>
	{@render children?.()}
</dialog>
