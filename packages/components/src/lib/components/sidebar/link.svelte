<script>
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

<a
	{href}
	class="flex cursor-pointer items-center gap-2 rounded px-4 py-1"
	class:bg-blue-100={ariaCurrent}
	class:hover:bg-blue-200={ariaCurrent}
	class:text-blue-600={ariaCurrent}
	class:dark:bg-blue-200={ariaCurrent}
	class:dark:hover:bg-blue-100={ariaCurrent}
	class:dark:text-blue-700={ariaCurrent}
	class:hover:bg-neutral-200={!ariaCurrent}
	class:dark:hover:bg-neutral-700={!ariaCurrent}
	class:dark:hover:text-inherit={!ariaCurrent}
	aria-current={ariaCurrent}
	use:sidebar.elements.hide
>
	<slot />
</a>
