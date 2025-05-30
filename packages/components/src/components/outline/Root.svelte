<script lang="ts">
	import type { TocEntry } from './types.js';
	import { getScrollingElement, isPartiallyHidden } from '../../dom/dom.js';
	// @ts-expect-error requires svelte-kit
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	// @ts-expect-error requires svelte-kit
	import { page } from '$app/stores';
	import { on } from 'svelte/events';
	import List from './List.svelte';

	interface Props {
		toc: TocEntry[];
	}

	let { toc }: Props = $props();
	let activeTarget: string | undefined = $state(toc[0]?.id);

	/**
	 * Set the first visible heading as active
	 */
	function updateActiveSlug(tree: TocEntry[]) {
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
		function findClosestAboveViewport(
			nodes: import('./types.js').TocEntry[],
		) {
			for (const node of nodes) {
				const element = document.getElementById(node.id);
				if (element) {
					const bounding = element.getBoundingClientRect();
					// Check if the element is above the viewport and closer to the top than the previous one
					if (
						bounding.top < 0 &&
						Math.abs(bounding.top) < closestDistance
					) {
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
	 * @link {https://github.com/sveltejs/kit/blob/a6fe5fcb1c7258281b4bf53b94543272e6e6c6d8/sites/kit.svelte.dev/src/routes/docs/%5Bslug%5D/OnThisPage.svelte#L67}
	 */
	function preferHashchangeTarget(url: URL) {
		const update = () => (activeTarget = url.hash.slice(1));

		// belt...
		queueMicrotask(update);

		// ...and braces
		on(window, 'scroll', update, { once: true });
	}

	function addScrollListener(node: HTMLElement) {
		const scrollingElement = getScrollingElement(node.parentElement);
		if (!scrollingElement) return;

		return {
			destroy: on(scrollingElement, 'scroll', () => {
				updateActiveSlug(toc);
			}),
		};
	}
</script>

<svelte:window onhashchange={() => preferHashchangeTarget($page.url)} />

<aside use:addScrollListener>
	<nav>
		<h5>On this page</h5>
		<List {activeTarget} {toc} />
	</nav>
</aside>

<style>
	@layer component {
		aside {
			align-self: flex-start;
			grid-column-end: outline-end;
			grid-column-start: outline-start;
			position: sticky;
			top: calc(var(--st-navbar-height) + var(--st-navbar-y-gap));
		}
		nav {
			--_display-xl: var(--st-breakpoint-xl) flex;
			display: var(--_display-xl, none);
			flex-direction: column;
			width: var(--st-size-72);
		}
		h5 {
			--_color-dark: var(--st-color-preference-dark)
				var(--st-color-neutral-400);
			color: var(--_color-dark, var(--st-color-neutral-900));
			font-size: var(--st-size-3);
			font-weight: 600;
			line-height: var(--st-size-4);
			padding-block-end: var(--st-size-1);
			padding-block-start: var(--st-size-2);
			padding-inline-start: var(--st-size-5);
			text-transform: uppercase;
			white-space: nowrap;
		}
	}
</style>
