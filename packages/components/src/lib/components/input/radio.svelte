<script lang="ts">
	export let checked: boolean = false;
	export let name: string | undefined = undefined;
	export let value: string;
	/* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any */
	export let onchange: ((...args: any[]) => any) | undefined = undefined;
</script>

<label>
	<input type="radio" {checked} {name} {value} on:change={onchange} />
	<slot />
</label>

<style>
	label {
		display: flex;
		gap: var(--st-size-1);
	}
</style>
