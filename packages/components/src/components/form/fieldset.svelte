<script lang="ts">
	import '../../css/utilities.css';
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLFieldsetAttributes {
		legend: Snippet;
		children: Snippet;
	}

	const { legend, children, ...restProps }: Props = $props();
</script>

<fieldset {...restProps}>
	<!--
		<legend/> does not participate in flex layout for web-compatibility reasons.
		So we hide it visually leaving it for screen readers only.
	-->
	<legend class="sr-only">
		{@render legend()}
	</legend>
	<div aria-hidden="true">
		{@render legend()}
	</div>
	{@render children()}
</fieldset>

<style>
	fieldset {
		display: flex;
		flex-direction: column;
		gap: var(--st-size-1);
	}
	div {
		display: flex;
	}
</style>
