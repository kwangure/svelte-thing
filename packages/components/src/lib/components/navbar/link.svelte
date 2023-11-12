<script>
	/** @type {((arg: HTMLElement) => any)} */
	export let action = () => {};
	/** @type {string} */
	export let href;
	/** @type {any} */
	export let props = undefined;
	/** @type {'_blank' | '_parent' | '_self' | '_top' | undefined} */
	export let target = undefined;

	$: rel = target === '_blank' ? 'noopener' : undefined;
</script>

<a
	{...props}
	use:action
	class="flex items-center gap-3 px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700"
	href={href}
	rel={rel}
	target={target}>
	<slot></slot>
</a>
