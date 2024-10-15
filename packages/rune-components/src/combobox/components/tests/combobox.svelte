<script lang="ts">
	import * as Combobox from '../';

	interface Fruit {
		key: string;
		value: string;
	}

	interface Props {
		isOpen?: boolean;
		options: Fruit[];
		value?: Fruit;
	}

	const { isOpen, options, value }: Props = $props();

	function filter({
		inputValue,
		options,
	}: Combobox.FilterArg<Fruit['value']>) {
		return (
			options?.filter((option) =>
				option.value.toLowerCase().startsWith(inputValue.toLowerCase()),
			) ?? []
		);
	}
</script>

<Combobox.Root
	label="Favorite Fruits"
	{isOpen}
	{value}
	{options}
	{filter}
	optionToString={(option) => option.value}
>
	{#snippet children(combobox)}
		<Combobox.Controls>
			<Combobox.Input />
		</Combobox.Controls>
		{console.log()}
		{#if combobox.isOpen}
			<Combobox.Listbox>
				{#each combobox.filteredOptions as option}
					<Combobox.ListboxItem item={option}>
						{option.value}
					</Combobox.ListboxItem>
				{/each}
			</Combobox.Listbox>
		{/if}
	{/snippet}
</Combobox.Root>
