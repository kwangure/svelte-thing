<script>
	import Children from './children.svelte';

	/** @type {import('mdast').Heading} */
	export let node;

	/** @type {string} */
	let id;

	$: {
		id = /** @type {string} */(node.data?.id);
	};
</script>

{#if node.depth === 1}
	<h1
		id={id}
		class="mb-2 mt-4 flex scroll-mt-[calc(var(--st-navbar-height)+var(--st-navbar-y-gap))] text-3xl font-semibold tracking-tight text-neutral-900 dark:text-slate-200 sm:text-4xl"
	>
		<Children {node} />
	</h1>
{:else if node.depth === 2}
	<h2
		id={id}
		class="mb-2 mt-4 flex scroll-mt-[calc(var(--st-navbar-height)+var(--st-navbar-y-gap))] whitespace-pre-wrap text-2xl tracking-tight text-neutral-900 dark:text-slate-200 sm:text-3xl"
	>
		<Children {node} />
	</h2>
{:else if node.depth === 3}
	<h3
		id={id}
		class="mb-2 mt-4 scroll-mt-[calc(var(--st-navbar-height)+var(--st-navbar-y-gap))] text-xl text-neutral-900 dark:text-slate-200 sm:text-2xl"
	>
		<Children {node} />
	</h3>
{:else if node.depth === 4}
	<h4
		id={id}
		class="mb-2 mt-4 scroll-mt-[calc(var(--st-navbar-height)+var(--st-navbar-y-gap))] font-bold text-neutral-900 dark:text-slate-200"
	>
		<Children {node} />
	</h4>
{:else if node.depth === 5}
	<h5
		id={id}
		class="mb-2 mt-4 scroll-mt-[calc(var(--st-navbar-height)+var(--st-navbar-y-gap))] font-bold text-neutral-900 dark:text-slate-200"
	>
		<Children {node} />
	</h5>
{:else if node.depth === 6}
	<h6
		id={id}
		class="scroll-mt-[calc(var(--st-navbar-height)+var(--st-navbar-y-gap))] font-bold text-neutral-900 dark:text-slate-200"
	>
		<Children {node} />
	</h6>
{/if}
