<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import {
		createComboboxInput,
		getComboboxContext,
	} from '@svelte-thing/builders';

	type ComboboxInput = ReturnType<typeof createComboboxInput>;
	type InputProps = Omit<
		HTMLInputAttributes,
		keyof ComboboxInput['properties']
	>;

	const { ...attributes }: InputProps = $props();
	const combobox = getComboboxContext();
	const input = createComboboxInput({ combobox });
</script>

<input {...attributes} {...input.properties} use:input.action />

<style>
	input {
		background-color: transparent;
		border: none;
		flex-grow: 1;
		outline: 0;
		padding-block: var(--st-size-1);
		padding-inline: 12px var(--st-size-2);
	}
</style>
