<script lang="ts">
	import '../../css/utilities.css';

	/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any */
	export let onchange: ((...args: any[]) => any) | undefined = undefined;
	/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any */
	export let oninput: ((...args: any[]) => any) | undefined = undefined;
</script>

<fieldset on:change={onchange} on:input={oninput}>
	<!--
		<legend/> does not participate in flex layout for web-compatibility reasons.
		So we hide it visually leaving it for screen readers only.
	-->
	<legend class="sr-only">
		<slot name="legend" />
	</legend>
	<div aria-hidden="true">
		<slot name="legend" />
	</div>
	<slot />
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
