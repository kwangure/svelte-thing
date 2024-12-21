<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/utilities.css';
	import Icon from './simple.svelte';

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

<a {...restProps} title={title ?? label} {target} {rel}>
	<Icon {path} />
	<span class="sr-only">{label}</span>
</a>

<style>
	@layer component {
		a {
			align-items: center;
			border-radius: var(--st-size-1);
			display: flex;
			justify-content: center;
			padding: var(--st-size-2);
			transition:
				color 0.125s ease-in,
				background-color 0.125s ease-in-out;
		}
		a:hover {
			--_background-color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-700);
			background-color: var(
				--_background-color-dark,
				var(--st-color-neutral-200)
			);
		}
	}
</style>
