<script lang="ts">
	import { Image } from '../elements/index.js';
	import type { Image as MdastImage } from 'mdast';

	export let node: MdastImage;
</script>

<Image alt={node.alt} src={node.url} />
