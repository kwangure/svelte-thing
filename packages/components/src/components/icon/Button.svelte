<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon from './Simple.svelte';

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
	@layer component {
		button {
			align-items: center;
			justify-content: center;
			--_background-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-800);
			background-color: var(
				--_background-color-dark,
				var(--st-color-neutral-100)
			);
			border: 1px solid var(--st-border-color-0);
			color: inherit;
			display: inline-flex;
			padding: var(--st-size-2);
			border-radius: var(--st-size-1);
			user-select: none;
			transition:
				background-color 0.25s ease,
				color 0.25s ease;
		}
		button:hover {
			--_background-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-700);
			background-color: var(
				--_background-color-dark,
				var(--st-color-neutral-200)
			);
		}
	}
</style>
