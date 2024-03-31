<script>
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/utilities.css';
	import Icon from './simple.svelte';

	/** @type {(node: HTMLElement) => any} */
	export let action = () => {};
	/** @type {string} */
	export let href;
	/** @type {string} */
	export let label;
	/** @type {any} */
	export let props = undefined;
	/** @type {string} */
	export let path;
	/** @type {'_blank' | '_parent' | '_self' | '_top' | undefined} */
	export let target = undefined;

	$: rel = target === '_blank' ? 'noopener' : undefined;
</script>

<a {...props} use:action {href} title={label} {target} {rel}>
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
