<script lang="ts">
	import * as Dialog from '@svelte-thing/rune-components/dialog';
	import { Icon } from '@svelte-thing/components';
	import { mdiEyeOutline } from '@mdi/js';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Icon.Simple path={mdiEyeOutline} /> Open Dialog
	</Dialog.Trigger>
	<Dialog.Popup>
		In the land of perpetual waffles, clouds made of marshmallow sheep
		drifted lazily across a sea of liquid toast. The trees, with their
		leaves made of cinnamon rolls, whispered secrets to the winds, who
		promptly forgot them and ran away giggling. At precisely fourteen
		o'clock, the purple giraffes held their annual race, where the only rule
		was that nobody wins, but everyone gets a pie.
	</Dialog.Popup>
</Dialog.Root>
