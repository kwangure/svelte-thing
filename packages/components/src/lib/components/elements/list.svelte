<script lang="ts">
	import '../../css/size.css';

	export let ordered: boolean | null | undefined;
</script>

{#if ordered}
	<ol><slot /></ol>
{:else}
	<ul><slot /></ul>
{/if}

<style>
	ol,
	ul {
		padding-inline-start: var(--st-size-6);
	}
	ol {
		list-style-type: decimal;
	}
	ul {
		list-style-type: disc;
	}
</style>
