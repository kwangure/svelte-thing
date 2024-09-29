<script lang="ts">
	import { Combobox } from '@svelte-thing/skinless-components';

	interface Fruit {
		id: number;
		label: string;
		value: string;
	}

	const options: Fruit[] = [
		{
			id: 1,
			label: 'Apple',
			value: 'apple',
		},
		{
			id: 2,
			label: 'Banana',
			value: 'banana',
		},
		{
			id: 3,
			label: 'Cherry',
			value: 'cherry',
		},
		{
			id: 4,
			label: 'Date',
			value: 'date',
		},
		{
			id: 5,
			label: 'Elderberry',
			value: 'elderberry',
		},
		{
			id: 6,
			label: 'Fig',
			value: 'fig',
		},
		{
			id: 7,
			label: 'Grape',
			value: 'grape',
		},
		{
			id: 8,
			label: 'Honeydew',
			value: 'honeydew',
		},
	];

	function filter({ options, inputValue }: Combobox.FilterArg<Fruit>) {
		return options?.filter(({ value }) => {
			return value.includes(inputValue.toLowerCase());
		});
	}
</script>

<div class="box">
	<div class="text">
		<Combobox.Root {options} {filter}>
			{#snippet children(combobox)}
				<Combobox.Controls>
					<Combobox.Input />
					<Combobox.Button label="Show Fruits" />
				</Combobox.Controls>
				{#if combobox.isOpen}
					<Combobox.Listbox>
						{#each combobox.filteredOptions as fruit}
							<Combobox.Item value={fruit}>
								{fruit.label}
							</Combobox.Item>
						{/each}
					</Combobox.Listbox>
				{/if}
			{/snippet}
		</Combobox.Root>
		In the land of perpetual waffles, clouds made of marshmallow sheep drifted lazily
		across a sea of liquid toast. The trees, with their leaves made of cinnamon rolls,
		whispered secrets to the winds, who promptly forgot them and ran away giggling.
		At precisely fourteen o'clock, the purple giraffes held their annual race, where
		the only rule was that nobody wins, but everyone gets a pie.
	</div>
</div>
