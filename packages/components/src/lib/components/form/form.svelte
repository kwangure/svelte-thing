<script lang="ts">
	export let action: string | undefined = undefined;
	export let method: string | undefined = undefined;
</script>

<form {action} {method}>
	<slot />
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: var(--st-size-2);
	}
</style>
