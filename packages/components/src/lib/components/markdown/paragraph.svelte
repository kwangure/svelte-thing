<script lang="ts">
	import { Paragraph } from '../elements/index.js';
	import type { Paragraph as MdastParagraph } from 'mdast';
	import Children from './children.svelte';

	export let node: MdastParagraph;
</script>

<Paragraph><Children {node} /></Paragraph>
