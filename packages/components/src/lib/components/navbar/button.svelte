<script>
	import '../../css/breakpoint.css';
	import '../../css/size.css';
	/** @type {((arg: HTMLElement) => any)} */
	export let action = () => {};
	/** @type {any} */
	export let props = undefined;
</script>

<button {...props} use:action>
	<slot />
</button>

<style>
	button {
		align-items: center;
		border-radius: var(--st-size-1);
		display: flex;
		gap: var(--st-size-3);
		padding-block: var(--st-size-1);
		--_padding-inline-sm: var(--st-breakpoint-sm) var(--st-size-3);
		padding-inline: var(--_padding-inline-sm, var(--st-size-2));
		transition:
			color 0.125s ease-in,
			background-color 0.125s ease-in-out;
	}
	button:hover {
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-700);
		background-color: var(
			--_background-color-dark,
			var(--st-color-neutral-200)
		);
	}
</style>
