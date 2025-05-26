<script lang="ts">
	import * as Combobox from '@svelte-thing/rune-components/combobox';
	import { Icon } from '@svelte-thing/components';
	import { mdiCheck } from '@mdi/js';

	interface Fruit {
		label: string;
		name: string;
	}
	interface Option {
		key: string;
		value: Fruit;
	}

	const fruits: Option[] = [
		{
			key: '1',
			value: { label: 'Apple', name: 'apple' },
		},
		{
			key: '2',
			value: { label: 'Banana', name: 'banana' },
		},
		{
			key: '3',
			value: { label: 'Cherry', name: 'cherry' },
		},
		{
			key: '4',
			value: { label: 'Date', name: 'date' },
		},
		{
			key: '5',
			value: { label: 'Elderberry', name: 'elderberry' },
		},
		{
			key: '6',
			value: { label: 'Fig', name: 'fig' },
		},
		{
			key: '7',
			value: { label: 'Grape', name: 'grape' },
		},
		{
			key: '8',
			value: { label: 'Honeydew', name: 'honeydew' },
		},
	];

	function options({ inputValue }: Combobox.GetOptionsArg) {
		return fruits.filter(({ value }) => {
			return value.name.includes(inputValue.trim().toLowerCase());
		});
	}
</script>

<div class="box">
	<div class="text">
		<Combobox.Root {options} optionToString={(fruit) => fruit.label}>
			{#snippet children(combobox)}
				<Combobox.Label>Fruits</Combobox.Label>
				<Combobox.Controls>
					<Combobox.Input />
					<Combobox.Trigger />
				</Combobox.Controls>
				{#if combobox.isOpen}
					<Combobox.Listbox>
						{#each combobox.options as fruit}
							<Combobox.ListboxItem item={fruit}>
								{#snippet children(listboxItem)}
									{#if listboxItem.isSelected}
										<Icon.Simple path={mdiCheck} />
									{/if}
									<span style="grid-column-start: 2;">
										{fruit.value.label}
									</span>
								{/snippet}
							</Combobox.ListboxItem>
						{/each}
					</Combobox.Listbox>
				{/if}
			{/snippet}
		</Combobox.Root>
		In the land of perpetual waffles, clouds made of marshmallow sheep drifted
		lazily across a sea of liquid toast. The trees, with their leaves made of
		cinnamon rolls, whispered secrets to the winds, who promptly forgot them
		and ran away giggling. At precisely fourteen o'clock, the purple giraffes
		held their annual race, where the only rule was that nobody wins, but everyone
		gets a pie.
	</div>
</div>
