<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import Icon from './Simple.svelte';

	interface Props extends HTMLAnchorAttributes {
		label: string;
		path: string;
	}

	const {
		label,
		path,
		target,
		title,
		rel = target === '_blank' ? 'noopener' : undefined,
		...restProps
	}: Props = $props();
</script>

<a data-st-icon-link {...restProps} title={title ?? label} {target} {rel}>
	<Icon {path} />
	<span class="sr-only">{label}</span>
</a>

<style>
	@layer component {
		a {
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
		a:hover {
			--background-color-mix: var(--st-color-preference-dark)
				rgba(255, 255, 255, 0.5);
			background-color: color-mix(
				in lch,
				var(--st-surface-color-1) 80%,
				var(--background-color-mix, rgba(0, 0, 0, 0.25))
			);
		}
	}
</style>
