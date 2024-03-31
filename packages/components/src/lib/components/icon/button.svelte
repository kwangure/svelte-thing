<script>
	import '../../css/size.css';
	import '../../css/utilities.css';
	import Icon from './simple.svelte';

	/** @type {(node: HTMLElement) => any} */
	export let action = () => {};
	/** @type {string} */
	export let label;
	/** @type {any} */
	export let props = undefined;
	/** @type {string} */
	export let path;
</script>

<button {...props} use:action title={label}>
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
		--_background-color: var(--st-color-neutral-200);
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		background-color: var(--_background-color-dark, var(--_background-color));
	}
</style>
