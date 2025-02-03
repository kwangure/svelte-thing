<script lang="ts">
	import * as Dialog from '@svelte-thing/rune-components/dialog';
</script>

<h1>Non-Modal Dialog Example</h1>

<p>
	Non-modal dialogs (popovers) are used for supplementary content that doesn't
	require immediate attention. The rest of the page remains interactive.
</p>

<div class="container">
	<Dialog.Root>
		<Dialog.Trigger>Show Help</Dialog.Trigger>
		<Dialog.NonModalPopup>
			<div class="dialog-content">
				<h2>Quick Help</h2>
				<p>This is a non-modal dialog using the Popover API.</p>
				<ul>
					<li>The page remains interactive while this is open</li>
					<li>Click outside or the close button to dismiss</li>
					<li>Great for contextual help, tooltips, or menus</li>
				</ul>
				<div class="dialog-footer">
					<Dialog.Close>Got it</Dialog.Close>
				</div>
			</div>
		</Dialog.NonModalPopup>
	</Dialog.Root>

	<div class="interactive-content">
		<h3>Try interacting with this!</h3>
		<p>
			Unlike with modal dialogs, you can still interact with the page
			while the popover is open. Try clicking these buttons:
		</p>
		<div class="button-group">
			<button class="secondary">Button 1</button>
			<button class="secondary">Button 2</button>
			<button class="secondary">Button 3</button>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
		margin-top: 2rem;
	}

	.interactive-content {
		flex: 1;
		padding: 1.5rem;
		border-radius: 8px;
	}

	.button-group {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.dialog-content {
		padding: 1.5rem;
		min-width: 300px;
		max-width: 400px;
	}

	.dialog-footer {
		margin-top: 1.5rem;
		display: flex;
		justify-content: flex-end;
	}

	ul {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	li {
		margin: 0.5rem 0;
	}
</style>
