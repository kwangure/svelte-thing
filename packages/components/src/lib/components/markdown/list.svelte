<script lang="ts">
	import { List } from '../elements/index.js';
	import type { List as MdastList } from 'mdast';
	import Children from './children.svelte';

	export let node: MdastList;
</script>

<List ordered={node.ordered}><Children {node} /></List>
