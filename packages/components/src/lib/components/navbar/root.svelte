<script>
	import '../../css/breakpoint.css';
	import '../../css/color-preference.css';
	import '../../css/color.css';
	import '../../css/size.css';
	import { getSidebarContext } from '../sidebar/sidebar.js';
	import Icon from '../icon/simple.svelte';
	import { mdiMenu } from '@mdi/js';

	export let showOpen = true;

	const { elements, state } = getSidebarContext();
	const { show } = elements;
	const { shouldShowToggle } = state;
</script>

<nav>
	{#if showOpen && $shouldShowToggle}
		<button title="Open Menu" aria-label="Open Menu" use:show={{ focus: true }}>
			<Icon --st-icon-width="100%" --st-icon-height=" " path={mdiMenu} />
		</button>
	{/if}
	<slot />
</nav>
<div />

<style>
	nav {
		align-items: center;
		--_background-color: var(--st-color-white);
		--_background-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-800);
		background-color: var(--_background-color-dark, var(--_background-color));
		display: flex;
		gap: var(--st-size-1);
		grid-column-end: nav-end;
		grid-column-start: nav-start;
		grid-row-end: 2;
		grid-row-start: 1;
		position: sticky;
		top: 0px;
		z-index: 40;
	}
	button {
		align-items: center;
		border-radius: var(--st-size-1);
		--_display: flex;
		--_display-lg: var(--st-breakpoint-lg) none;
		display: var(--_display-lg, var(--_display));
		height: var(--st-size-12);
		justify-content: center;
		margin-inline-start: -1rem /* -16px */;
		padding: var(--st-size-2);
		touch-action: manipulation;
		user-select: none;
		width: var(--st-size-12);
	}
	div {
		align-self: flex-end;
		--_border-color: var(--st-color-neutral-300);
		--_border-color-dark: var(--st-color-preference-dark)
			var(--st-color-neutral-600);
		border-color: var(--_border-color-dark, var(--_border-color));
		border-bottom-width: 1px;
		grid-column-end: page-end;
		grid-column-start: page-start;
		grid-row-end: 2;
		grid-row-start: 1;
		position: sticky;
		top: var(--st-navbar-height);
		z-index: 40;
	}
</style>
