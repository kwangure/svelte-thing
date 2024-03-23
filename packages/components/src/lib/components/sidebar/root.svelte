<script>
	import '../../css/color.css';
	import '../../css/color-preference.css';
	import '../../css/size.css';
	import { getSidebarContext } from './sidebar.js';
	import Icon from '../icon/simple.svelte';
	import { mdiClose } from '@mdi/js';

	const { elements, state } = getSidebarContext();
	const { hide, panel } = elements;
	const { shouldShowToggle, visibility } = state;

	shouldShowToggle.set(true);
</script>

<aside class:hidden={$visibility === 'hidden'}>
	<nav use:panel={{ shouldTrapFocus: () => window.innerWidth < 1024 }}>
		<button
			title="Close Menu"
			aria-label="Close Menu"
			class="times-close"
			use:hide={{ focus: true }}
		>
			<Icon --st-icon-width="100%" --st-icon-height=" " path={mdiClose} />
		</button>
		<slot />
	</nav>
	<button
		title="Close Menu"
		aria-label="Close Menu"
		use:hide
		class="overlay-close"
	/>
</aside>

<style>
	aside {
		display: flex;
		grid-column-start: page-start;
		grid-column-end: page-end;
		grid-row-start: 1;
		grid-row-end: 3;
		height: 100vh;
		position: sticky;
		top: 0;
		z-index: 40;
	}
	@media (max-width: 1024px) {
		aside.hidden {
			display: none;
		}
	}
	@media (min-width: 1024px) {
		aside {
			align-self: flex-start;
			grid-column-start: nav-start;
			grid-column-end: content-start;
			grid-row-start: 2;
			height: calc(100vh - var(--st-navbar-height) - var(--st-navbar-y-gap));
			top: calc(var(--st-navbar-height) + var(--st-navbar-y-gap));
		}
	}
	nav {
		background-color: var(--st-light, var(--st-white))
			var(--st-dark, var(--st-neutral-800));
		display: flex;
		flex-direction: column;
		height: 100%;
		padding-bottom: var(--st-size-24);
		overflow: hidden;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding-inline: var(--st-size-2);
		width: var(--st-size-72);
	}
	.times-close {
		align-items: center;
		display: flex;
		border-radius: var(--st-size-1);
		justify-content: center;
		height: var(--st-size-12);
		padding: var(--st-size-2);
		width: var(--st-size-12);
		touch-action: manipulation;
		user-select: none;
	}
	@media (min-width: 1024px) {
		.times-close {
			display: none;
		}
	}
	.overlay-close {
		background-color: var(--st-light, rgb(0 0 0 / 0.1))
			var(--st-dark, rgb(64 64 64 / 0.4));
		flex: 1 1 0%;
		touch-action: manipulation;
	}
	@media (min-width: 1024px) {
		.overlay-close {
			display: none;
		}
	}
</style>
