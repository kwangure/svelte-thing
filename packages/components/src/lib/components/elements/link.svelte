<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../../css/color.css';
	import '../../css/size.css';

	interface Props {
		children: Snippet;
		href: string;
		title?: string;
	}

	const { href, title, children }: Props = $props();
</script>

<a {href} {title}>{@render children()}</a>

<style>
	a {
		color: var(--st-color-blue-500);
		text-underline-offset: var(--st-size-1);
		text-decoration-line: underline;
	}
	a:hover {
		text-decoration-thickness: var(--st-size-0_5);
	}
</style>
