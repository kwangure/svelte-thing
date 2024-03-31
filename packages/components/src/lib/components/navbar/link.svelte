<script>
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';

	/** @type {((arg: HTMLElement) => any)} */
	export let action = () => {};
	/** @type {string} */
	export let href;
	/** @type {any} */
	export let props = undefined;
	/** @type {'_blank' | '_parent' | '_self' | '_top' | undefined} */
	export let target = undefined;

	$: rel = target === '_blank' ? 'noopener' : undefined;
</script>

<a {...props} use:action {href} {rel} {target}>
	<slot />
</a>

<style>
	a {
		align-items: center;
		border-radius: var(--st-size-1);
		display: flex;
		gap: var(--st-size-3);
		padding-block: var(--st-size-1);
		padding-inline: var(--st-size-2);
		transition:
			color 0.25s ease-in,
			background-color 0.25s ease-in;
	}
	a:hover {
		--_background-color: var(--st-color-neutral-200);
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		background-color: var(--_background-color-dark, var(--_background-color));
	}
</style>
