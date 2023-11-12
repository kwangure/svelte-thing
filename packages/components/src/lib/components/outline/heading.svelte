<script>
	import { Item } from '../sidebar/index.js';
	import Link from './link.svelte';
	import List from './list.svelte';

	/** @type {import('./types.js').TocEntry} */
	export let self;
	/** @type {string | undefined} */
	export let activeTarget;
</script>

<Item>
	<div class:pl-5={self.depth == 3}>
		<Link href={self.hash} ariaCurrent={self.id === activeTarget}>
			{self.value}
		</Link>
	</div>
	<List {activeTarget} toc={self.children} />
</Item>
