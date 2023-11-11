<script>
	import Icon from './simple.svelte';

	/** @type {(node: HTMLElement) => any} */
	export let action = () => {};
	/** @type {string} */
	export let href;
	/** @type {string} */
	export let label;
	/** @type {any} */
	export let props = undefined;
	/** @type {string} */
	export let path;
	/** @type {'_blank' | '_parent' | '_self' | '_top' | undefined} */
	export let target = undefined;

	$: rel = target === '_blank' ? 'noopener' : undefined;
</script>

<a {...props} use:action class="p-2 flex items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-700" {href} title={label} {target} {rel}>
	<Icon path={path} />
	<span class="sr-only">{label}</span>
</a>
