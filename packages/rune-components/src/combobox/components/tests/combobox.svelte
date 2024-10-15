<script lang="ts">
	import * as Combobox from '../';
	import type { ComboboxOption } from '../../runes';

	interface FruitOption extends ComboboxOption<Fruit> {
		key: string;
	}

	type Fruit = string;

	interface Props {
		isOpen?: boolean;
		options: FruitOption[];
		value?: FruitOption;
	}

	const { isOpen, options, value }: Props = $props();

	function filter({ inputValue, options }: Combobox.FilterArg<Fruit>) {
		return (
			options?.filter((option) =>
				option.value.toLowerCase().startsWith(inputValue.toLowerCase()),
			) ?? []
		);
	}
</script>

<Combobox.Root label="Favorite Fruits" {isOpen} {value} {options} {filter}>
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
