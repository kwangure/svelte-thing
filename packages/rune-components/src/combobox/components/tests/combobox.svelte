<script lang="ts">
	import * as Combobox from '../index.js';
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

	const { isOpen, options: fruits, value }: Props = $props();

	function options({ inputValue }: Combobox.GetOptionsArg) {
		return fruits.filter((fruit) =>
			fruit.value.toLowerCase().includes(inputValue.toLowerCase()),
		);
	}
</script>

<Combobox.Root {isOpen} {value} {options}>
	{#snippet children(combobox)}
		<Combobox.Label>Favorite Fruits</Combobox.Label>
		<Combobox.Controls>
			<Combobox.Input />
			<Combobox.Button />
		</Combobox.Controls>
		{#if combobox.isOpen}
			<Combobox.Listbox>
				{#each combobox.options as option}
					<Combobox.ListboxItem item={option}>
						{option.value}
					</Combobox.ListboxItem>
				{/each}
			</Combobox.Listbox>
		{/if}
	{/snippet}
</Combobox.Root>
