<script>
	import { getSidebarContext } from './sidebar.js';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	/**
	 * @typedef {'location' | 'page' | boolean | null | undefined} AriaCurrent
	*/

	/** @type {AriaCurrent} */
	export let ariaCurrent = undefined;
	/** @type {string} */
	export let href;
	/** @type {boolean} */
	export let secondary = false;

	const sidebar = getSidebarContext();
	const ariaCurrentStore = createAriaCurrentStore();

	$: ariaCurrentStore.updateHref(href);
	$: ariaCurrentStore.updatePathname($page.url.pathname);
	$: ariaCurrentStore.updateAriaCurrent(ariaCurrent);

	function createAriaCurrentStore() {
		const store = writable(/** @type {AriaCurrent} */(null));
		const { set, subscribe } = store;
		let href = '';
		let pathname = '';
		/** @type {AriaCurrent} */
		let userAriaCurrent;
		return {
			/** @param {string} v */
			updateHref(v) {
				href = v;
				set(computeAriaCurrent(href, pathname, userAriaCurrent));
			},
			/** @param {string} v */
			updatePathname(v) {
				pathname = v;
				set(computeAriaCurrent(href, pathname, userAriaCurrent));
			},
			/** @param {AriaCurrent} v */
			updateAriaCurrent(v) {
				userAriaCurrent = v;
				set(computeAriaCurrent(href, pathname, userAriaCurrent));
			},
			subscribe,
		};
	}


	/**
	 * @param {string} href
	 * @param {string} pathname
	 * @param {'location' | 'page' | boolean | null} [userAriaCurrent]
	 */
	export function computeAriaCurrent(href, pathname, userAriaCurrent) {
		if (userAriaCurrent !== undefined) return userAriaCurrent;
		if (href[0] === '#') {
			if (typeof location !== 'undefined' && location.hash === href) return true;
			return null;
		}

		if (href[0] !== '/') return null;

		if (href.endsWith('/')) href = href.slice(0, href.length - 1);
		if (pathname === href) return 'page';
		if (pathname.startsWith(`${href}/`)) return 'location';

		return null;
	}
</script>

{#if $ariaCurrentStore}
	<a
		{href}
		class="flex cursor-pointer items-center gap-2 rounded px-4 py-1"
		class:bg-blue-100={!secondary}
		class:hover:bg-blue-200={!secondary}
		class:text-blue-600={!secondary}
		class:bg-neutral-200={secondary}
		class:hover:bg-neutral-300={secondary}
		class:dark:bg-blue-200={!secondary}
		class:dark:hover:bg-blue-100={!secondary}
		class:dark:text-blue-700={!secondary}
		class:dark:bg-neutral-700={secondary}
		class:dark:hover:bg-neutral-600={secondary}
		class:dark:text-neutral-300={secondary}
		aria-current={$ariaCurrentStore}
		use:sidebar.elements.hide
	>
		<slot />
	</a>
{:else}
	<a
		{href}
		class="flex cursor-pointer items-center gap-2 rounded px-4 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-inherit"
		aria-current={$ariaCurrentStore}
		use:sidebar.elements.hide
	>
		<slot />
	</a>
{/if}
