<script lang="ts">
	import { Blockquote } from '../elements/index.js';
	import type { Blockquote as MdastBlockquote } from 'mdast';
	import Children from './children.svelte';

	export let node: MdastBlockquote;
</script>

<Blockquote><Children {node} /></Blockquote>
