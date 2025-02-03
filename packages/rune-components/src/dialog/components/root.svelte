<!--
	@component

	Dialog presents a dialog box or modal.
-->
<script lang="ts">
	import type { CreateDialogRootConfig, DialogRoot } from '../runes';
	import type { Snippet } from 'svelte';
	import type { NullablyRequired } from '../../types.js';
	import { skip, watch } from '@svelte-thing/component-utils/reactivity';
	import { setDialogContext } from '../runes';

	interface Props extends CreateDialogRootConfig {
		children?: Snippet<[DialogRoot]>;
	}

	const { children, isOpen }: Props = $props();

	const dialog = setDialogContext({
		isOpen,
	} satisfies NullablyRequired<CreateDialogRootConfig>);

	watch(() => isOpen, dialog.setIsOpen, skip(1));
</script>

{@render children?.(dialog)}
