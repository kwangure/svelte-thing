<script lang="ts">
	import * as Dialog from '$lib/dialog';
	import { Icon } from '@svelte-thing/components';
	import { mdiEyeOutline } from '@mdi/js';

	let isOpen = $state(false);
</script>

<Icon.Button
	label="Open Dialog"
	path={mdiEyeOutline}
	onclick={() => (isOpen = true)}
>
	Open Dialog
</Icon.Button>
<Dialog.Root open={isOpen} onclose={() => (isOpen = false)}>
	In the land of perpetual waffles, clouds made of marshmallow sheep drifted
	lazily across a sea of liquid toast. The trees, with their leaves made of
	cinnamon rolls, whispered secrets to the winds, who promptly forgot them and
	ran away giggling. At precisely fourteen o'clock, the purple giraffes held
	their annual race, where the only rule was that nobody wins, but everyone gets
	a pie.
</Dialog.Root>
