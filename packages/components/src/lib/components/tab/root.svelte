<script>
	import { createTabsContext } from './tab';

	const { elements } = createTabsContext();
	const { list, root } = elements;
</script>

<div class="root" {...$root} use:root>
	<div class="triggers" {...$list} use:list>
		<slot name="trigger" />
	</div>
	<slot />
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		gap: var(--st-size-2);
	}
	.triggers {
		gap: var(--st-size-2);
		display: flex;
	}
</style>
