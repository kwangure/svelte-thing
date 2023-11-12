<script>
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isPartiallyHidden } from '../../dom/dom.js';
	import List from './list.svelte';
	import { page } from '$app/stores';

	/** @type {import('./types.js').TocEntry[]} */
	export let toc;

	/** @type {string} */
	let activeTarget = toc[0]?.id;

	/**
	 * Set the first visible heading as active
	 *
	 * @param {import('./types.js').TocEntry[]} tree
	 */
	function updateActiveSlug(tree) {
		for (const heading of tree) {
			const element = document.getElementById(heading.id);
			if (!element) continue;
			if (isPartiallyHidden(element)) continue;

			activeTarget = heading.id;
			return true;
		}

		for (const heading of tree) {
			const activeTargetFound = updateActiveSlug(heading.children);
			if (activeTargetFound) return true;
		}

		let closestDistance = Infinity;
		/**
		 * @param {import("./types.js").TocEntry[]} nodes
		 */
		function findClosestAboveViewport(nodes) {
			for (const node of nodes) {
				const element = document.getElementById(node.id);
				if (element) {
					const bounding = element.getBoundingClientRect();
					// Check if the element is above the viewport and closer to the top than the previous one
					if (bounding.top < 0 && Math.abs(bounding.top) < closestDistance) {
						closestDistance = Math.abs(bounding.top);
						activeTarget = node.id;
					}
				}

				findClosestAboveViewport(node.children);
			}
		}

		findClosestAboveViewport(tree);

		return true;
	}

	afterNavigate(() => updateActiveSlug(toc));

	onMount(async () => {
		await document.fonts.ready;

		updateActiveSlug(toc);
	});

	/**
	 * Prioritize the changed hash over the output of the algorithm in
	 * `updateActiveSlug()`
	 *
	 * @param {URL} url
	 * @link {https://github.com/sveltejs/kit/blob/a6fe5fcb1c7258281b4bf53b94543272e6e6c6d8/sites/kit.svelte.dev/src/routes/docs/%5Bslug%5D/OnThisPage.svelte#L67}
	 */
	function preferHashchangeTarget(url) {
		const update = () => (activeTarget = url.hash.slice(1));

		// belt...
		queueMicrotask(update);

		// ...and braces
		addEventListener('scroll', update, { once: true });
	}
</script>

<svelte:window
	on:scroll={() => updateActiveSlug(toc)}
	on:hashchange={() => preferHashchangeTarget($page.url)}
/>

<aside class="sticky top-[calc(var(--st-navbar-height)+var(--st-navbar-y-gap))] self-start col-start-[outline-start] col-end-[outline-end]">
	<nav class='hidden xl:flex flex-col w-72'>
		<h5 class="whitespace-nowrap pb-1 pt-2 pl-5 text-xs font-semibold uppercase text-neutral-900 dark:text-neutral-400">
			On this page
		</h5>
		<List {activeTarget} {toc} />
	</nav>
</aside>
