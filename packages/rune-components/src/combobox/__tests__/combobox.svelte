<script lang="ts">
	import * as Combobox from '../index.js';
	import type { Option } from '../root/root.svelte.js';

	interface FruitOption extends Option<Fruit> {
		key: string;
	}

	type Fruit = string;

	interface Props {
		isOpen?: boolean;
		options: FruitOption[];
		value?: FruitOption;
	}

	const { isOpen, options: fruits, value }: Props = $props();

	function options({ inputValue }: { readonly inputValue: string }) {
		return fruits.filter((fruit) =>
			fruit.value.toLowerCase().includes(inputValue.toLowerCase()),
		);
	}
</script>

<Combobox.Root {isOpen} {value} {options}>
	{#snippet children(root)}
		<Combobox.Label>Favorite Fruits</Combobox.Label>
		<Combobox.Controls>
			<Combobox.Input />
			<Combobox.Trigger />
		</Combobox.Controls>
		{#if root.isOpen}
			<Combobox.Listbox>
				{#each root.options as option}
					<Combobox.ListboxItem item={option}>
						{option.value}
					</Combobox.ListboxItem>
				{/each}
			</Combobox.Listbox>
		{/if}
	{/snippet}
</Combobox.Root>
