<script>
	/**
	 * @typedef {'location' | 'page' | boolean | null | undefined} AriaCurrent
	*/

	/** @type {AriaCurrent} */
	export let ariaCurrent = undefined;
	/** @type {string} */
	export let href;
</script>

<a
	{href}
	class="flex cursor-pointer items-center gap-2 rounded px-4 py-1"
	class:bg-neutral-200={ariaCurrent}
	class:hover:bg-neutral-300={ariaCurrent}
	class:dark:bg-neutral-700={ariaCurrent}
	class:dark:hover:bg-neutral-600={ariaCurrent}
	class:dark:text-neutral-300={ariaCurrent}
	class:hover:bg-neutral-200={!ariaCurrent}
	class:dark:hover:bg-neutral-700={!ariaCurrent}
	aria-current={ariaCurrent}
>
	<slot />
</a>

