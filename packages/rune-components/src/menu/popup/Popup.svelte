<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { NullablyRequired } from '../../types';
	import { createPopup, type CreatePopupConfig } from './createPopup.svelte';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';
	import { getRootContext } from '../context';

	type Props = HTMLAttributes<HTMLUListElement>;

	const { children, ...restProps }: Props = $props();
	const root = getRootContext();
	const popup = createPopup({
		root,
	} satisfies NullablyRequired<CreatePopupConfig>);
</script>

<ul {...mergeProps(popup.props, restProps)}>
	{@render children?.()}
</ul>
