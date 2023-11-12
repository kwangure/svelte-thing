<script>
	import Icon from './simple.svelte';

	/** @type {(node: HTMLElement) => any} */
	export let action = () => {};
	/** @type {string} */
	export let label;
	/** @type {any} */
	export let props = undefined;
	/** @type {string} */
	export let path;
</script>

<button {...props} use:action class="p-2 flex items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-700" title={label}>
	<Icon path={path} />
	<span class="sr-only">{label}</span>
</button>
