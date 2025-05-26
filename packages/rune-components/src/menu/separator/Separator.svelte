<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';
	import { createSeparator } from './createSeparator.svelte.js';
	import { mergeProps } from '@svelte-thing/component-utils/svelte';

	const { children, ...restProps }: HTMLLiAttributes = $props();
	const separator = createSeparator();
</script>

<li {...mergeProps(separator.props, restProps)}>
	{@render children?.()}
</li>

<style>
	li {
		margin: 0;
		padding: 6px;
		display: block;
		width: 4em;
		background-color: #eee;
		color: black;
		border-radius: 5px;
		padding-top: 3px;
		background-image: url('../images/separator.svg');
		background-position: center;
		background-repeat: repeat-x;
	}
</style>
