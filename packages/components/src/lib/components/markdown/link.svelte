<script lang="ts">
	import { Link } from '../elements/index.js';
	import type { Link as MdastLink } from 'mdast';
	import Children from './children.svelte';

	export let node: MdastLink;
</script>

<Link href={node.url} title={node.title}>
	<Children {node} />
</Link>
