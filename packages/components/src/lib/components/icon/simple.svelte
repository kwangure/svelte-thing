<script>
	import '../../css/size.css';

	/** @type {boolean} */
	export let ariaHidden = true;
	/** @type {string} */
	export let path;
</script>

<svg aria-hidden={ariaHidden} viewBox="0 0 24 24">
	<path d={path} />
</svg>

<style>
	svg {
		height: var(--st-icon-height, var(--st-size-5));
		width: var(--st-icon-width, var(--st-size-5));
	}
	path {
		fill: var(--st-icon-fill, currentColor);
	}
</style>
