<script>
	/** @type {((arg: HTMLElement) => any)} */
	export let action = () => {};
	/** @type {any} */
	export let props = undefined;
</script>

<button
	{...props}
	use:action
	class="flex items-center gap-3 px-2 sm:px-3 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700">
	<slot></slot>
</button>
