<script>
	/* eslint-disable svelte/no-at-html-tags */
	import { createDarkmodeScriptTag } from '../creators/darkmode.js';
</script>

<svelte:head>
	{@html createDarkmodeScriptTag()}
</svelte:head>
