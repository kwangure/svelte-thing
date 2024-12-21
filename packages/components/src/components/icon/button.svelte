<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import '../../css/size.css';
	import '../../css/utilities.css';
	import Icon from './simple.svelte';

	interface Props extends HTMLButtonAttributes {
		label: string;
		path: string;
	}

	const { label, path, title, ...restProps }: Props = $props();
</script>

<button {...restProps} title={title ?? label}>
	<Icon {path} />
	<span class="sr-only">{label}</span>
</button>

<style>
	button {
		align-items: center;
		border-radius: var(--st-size-1);
		display: flex;
		justify-content: center;
		padding: var(--st-size-2);
		transition:
			color 0.125s ease-in,
			background-color 0.125s ease-in-out;
	}
	button:hover {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		background-color: var(
			--_background-color-dark,
			var(--st-color-neutral-200)
		);
	}
</style>
