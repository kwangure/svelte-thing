<script>
	import '../../css/breakpoint.css';
	import '../../css/size.css';
	import Children from './children.svelte';

	/** @type {import('mdast').Heading} */
	export let node;

	/** @type {string} */
	let id;

	$: {
		id = /** @type {string} */ (node.data?.id);
	}
</script>

{#if node.depth === 1}
	<h1 {id}><Children {node} /></h1>
{:else if node.depth === 2}
	<h2 {id}><Children {node} /></h2>
{:else if node.depth === 3}
	<h3 {id}><Children {node} /></h3>
{:else if node.depth === 4}
	<h4 {id}><Children {node} /></h4>
{:else if node.depth === 5}
	<h5 {id}><Children {node} /></h5>
{:else if node.depth === 6}
	<h6 {id}><Children {node} /></h6>
{/if}

<style>
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		--_color: var(--st-color-neutral-900);
		--_color-dark: var(--st-color-preference-dark) var(--st-color-neutral-200);
		color: var(--_color-dark, var(--_color));
		font-weight: 600;
		scroll-margin-top: calc(var(--st-navbar-height) + var(--st-navbar-y-gap));
	}
	h1,
	h2,
	h3,
	h4,
	h5 {
		margin-block-end: var(--st-size-2);
		margin-block-start: var(--st-size-4);
	}
	h1,
	h2 {
		letter-spacing: -0.025em;
	}
	h1 {
		--_font-size: var(--st-size-7_5);
		--_font-size-sm: var(--st-breakpoint-sm) var(--st-size-9);
		font-size: var(--_font-size-sm, var(--_font-size));
		--_line-height: var(--st-size-9);
		--_line-height-sm: var(--st-breakpoint-sm) var(--st-size-10);
		line-height: var(--_line-height-sm, var(--_line-height));
	}
	h2 {
		--_font-size: var(--st-size-6);
		--_font-size-sm: var(--st-breakpoint-sm) var(--st-size-7_5);
		font-size: var(--_font-size-sm, var(--_font-size));
		--_line-height: var(--st-size-8);
		--_line-height-sm: var(--st-breakpoint-sm) var(--st-size-9);
		line-height: var(--_line-height-sm, var(--_line-height));
	}
	h3 {
		--_font-size: var(--st-size-5);
		--_font-size-sm: var(--st-breakpoint-sm) var(--st-size-6);
		font-size: var(--_font-size-sm, var(--_font-size));
		--_line-height: var(--st-size-7);
		--_line-height-sm: var(--st-breakpoint-sm) var(--st-size-8);
		line-height: var(--_line-height-sm, var(--_line-height));
	}
</style>
