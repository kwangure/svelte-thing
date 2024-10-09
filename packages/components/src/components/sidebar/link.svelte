<script>
	import '../../css/size.css';
	import { getSidebarContext } from './sidebar.js';

	/**
	 * @typedef {'location' | 'page' | boolean | null | undefined} AriaCurrent
	 */

	/** @type {AriaCurrent} */
	export let ariaCurrent = undefined;
	/** @type {string} */
	export let href;

	const sidebar = getSidebarContext();
</script>

<a {href} aria-current={ariaCurrent} use:sidebar.elements.hide>
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
	[aria-current='true'],
	[aria-current='location'],
	[aria-current='page'] {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-blue-200);
		background-color: var(
			--_background-color-dark,
			var(--st-color-blue-100)
		);
		--_color-dark: var(--st-color-preference-dark) var(--st-color-blue-700);
		color: var(--_color-dark, var(--st-color-blue-600));
	}
	[aria-current='true']:hover,
	[aria-current='location']:hover,
	[aria-current='page']:hover {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-blue-100);
		background-color: var(
			--_background-color-dark,
			var(--st-color-blue-200)
		);
	}
</style>
