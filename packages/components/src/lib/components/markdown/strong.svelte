<script lang="ts">
	import { Strong } from '../elements/index.js';
	import type { Strong as MdastStrong } from 'mdast';
	import Children from './children.svelte';

	export let node: MdastStrong;
</script>

<Strong><Children {node} /></Strong>
