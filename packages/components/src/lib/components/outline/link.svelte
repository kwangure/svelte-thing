<script>
	import '../../css/color-preference.css';
	import '../../css/color.css';
	/**
	 * @typedef {'location' | 'page' | boolean | null | undefined} AriaCurrent
	 */

	/** @type {AriaCurrent} */
	export let ariaCurrent = undefined;
	/** @type {string} */
	export let href;
</script>

<a {href} aria-current={ariaCurrent}>
	<slot />
</a>

<style>
	a {
		align-items: center;
		border-radius: var(--st-size-1);
		cursor: pointer;
		display: flex;
		gap: var(--st-size-2);
		padding-block: var(--st-size-1);
		padding-inline: var(--st-size-4);
	}
	a:hover {
		--_background-color: var(--st-color-neutral-200);
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		background-color: var(--_background-color-dark, var(--_background-color));
	}
	[aria-current='true'],
	[aria-current='location'],
	[aria-current='page'] {
		--_background-color: var(--st-color-neutral-200);
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		background-color: var(--_background-color-dark, var(--_background-color));
		color: var(--st-color-preference-dark) var(--st-color-neutral-300);
	}
	[aria-current='true']:hover,
	[aria-current='location']:hover,
	[aria-current='page']:hover {
		--_background-color: var(--st-color-neutral-300);
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-600);
		background-color: var(--_background-color-dark, var(--_background-color));
	}
</style>
