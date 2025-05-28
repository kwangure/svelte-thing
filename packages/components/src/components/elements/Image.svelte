<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	const props: HTMLImgAttributes = $props();
</script>

<img {...props} />
