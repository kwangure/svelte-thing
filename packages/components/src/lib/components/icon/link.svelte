<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/utilities.css';
	import Icon from './simple.svelte';

	const {
		action = () => {},
		href,
		label,
		path,
		target,
		rel = target === '_blank' ? 'noopener' : undefined,
		...attributes
	}: {
		/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any */
		action: (node: HTMLElement) => any;
		href: string;
		label: string;
		path: string;
	} & HTMLAnchorAttributes = $props();
</script>

<a {...attributes} use:action {href} title={label} {target} {rel}>
	<Icon {path} />
	<span class="sr-only">{label}</span>
</a>

<style>
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
</style>
