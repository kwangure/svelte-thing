<script lang="ts">
	import type { TocEntry } from './types';
	import { Item } from '../sidebar/index.js';
	import Link from './Link.svelte';
	import List from './List.svelte';

	interface Props {
		self: TocEntry;
		activeTarget: string | undefined;
	}
	let { self, activeTarget }: Props = $props();
</script>

<Item>
	<div class:nested={self.depth == 3}>
		<Link href={self.hash} aria-current={self.id === activeTarget}>
			{self.value}
		</Link>
	</div>
	<List {activeTarget} toc={self.children} />
</Item>

<style>
	@layer component {
		.nested {
			padding-inline-start: var(--st-size-5);
		}
	}
</style>
