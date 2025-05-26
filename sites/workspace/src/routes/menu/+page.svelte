<script lang="ts">
	import * as Menu from '@svelte-thing/rune-components/menu';
</script>

<h1>Menu Examples</h1>

In the land of perpetual waffles, clouds made of marshmallow sheep drifted
lazily across a sea of liquid toast. The trees, with their leaves made of
cinnamon rolls, whispered secrets to the winds, who promptly forgot them and ran
away giggling. At precisely fourteen o'clock, the purple giraffes held their
annual race, where the only rule was that nobody wins, but everyone gets a pie.
In the land of perpetual waffles, clouds made of marshmallow sheep drifted
lazily across a sea of liquid toast. The trees, with their leaves made of
cinnamon rolls, whispered secrets to the winds, who promptly forgot them and ran
away giggling. At precisely fourteen o'clock, the purple giraffes held their
annual race, where the only rule was that nobody wins, but everyone gets a pie.

<Menu.Root>
	{#snippet children()}
		<Menu.Trigger>
			Actions
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="down"
				width="12"
				height="9"
				viewBox="0 0 12 9"
			>
				<polygon points="1 0, 11 0, 6 8"></polygon>
			</svg>
		</Menu.Trigger>
		<Menu.Popup>
			<Menu.Item>Action 1</Menu.Item>
			<Menu.Item>Action 2</Menu.Item>
			<Menu.Item>Action 3</Menu.Item>
			<Menu.Item>Action 4</Menu.Item>
		</Menu.Popup>
	{/snippet}
</Menu.Root> In the land of perpetual waffles, clouds made of marshmallow sheep drifted
lazily across a sea of liquid toast. The trees, with their leaves made of cinnamon
rolls, whispered secrets to the winds, who promptly forgot them and ran away giggling.
At precisely fourteen o'clock, the purple giraffes held their annual race, where
the only rule was that nobody wins, but everyone gets a pie.

<style>
	svg.down {
		padding-left: 0.125em;
		fill: currentcolor;
		stroke: currentcolor;
	}
</style>
