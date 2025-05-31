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
			background-color: var(--st-surface-color-1);
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
			--background-color-mix: var(--st-color-preference-dark) white;
			background-color: color-mix(
				in lch,
				var(--st-surface-color-1) 80%,
				var(--background-color-mix, rgba(0, 0, 0, 0.1))
			);
		}
	}
</style>
