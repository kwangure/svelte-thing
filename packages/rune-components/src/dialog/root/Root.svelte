<!--
	@component

	Dialog presents a dialog box or modal.
-->
<script lang="ts">
	import type { CreateRootConfig, TRoot } from './createRoot.svelte.js';
	import type { Snippet } from 'svelte';
	import type { NullablyRequired } from '../../types.js';
	import { skip, watch } from '@svelte-thing/component-utils/svelte';
	import { createRoot } from './createRoot.svelte.js';
	import { setRootContext } from '../context.js';

	interface Props extends CreateRootConfig {
		children?: Snippet<[TRoot]>;
	}

	const { children, isOpen }: Props = $props();
	const root = setRootContext(
		createRoot({
			isOpen,
		} satisfies NullablyRequired<CreateRootConfig>),
	);

	watch(() => isOpen, root.setIsOpen, skip(1));
</script>

{@render children?.(root)}
