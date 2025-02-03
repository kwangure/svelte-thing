<script lang="ts">
	import * as Dialog from '@svelte-thing/rune-components/dialog';
</script>

<h1>Modal Dialog Example</h1>

<p>
	Modal dialogs are used for important interactions that require the user's
	full attention. The rest of the page is inert while the dialog is open.
</p>

<Dialog.Root>
	<Dialog.Trigger>Open Modal Dialog</Dialog.Trigger>
	<Dialog.ModalPopup>
		<div class="dialog-content">
			<h2>Important Action Required</h2>
			<p>
				This is a modal dialog. You must interact with it before
				continuing.
			</p>
			<p>Try clicking outside or pressing ESC - the dialog will close.</p>
			<p>When the dialog closes, focus returns to the trigger button.</p>
			<div class="dialog-footer">
				<Dialog.Close autofocus>Close Dialog</Dialog.Close>
			</div>
		</div>
	</Dialog.ModalPopup>
</Dialog.Root>

<style>
	.dialog-content {
		padding: 1.5rem;
		min-width: 300px;
		max-width: 500px;
	}

	.dialog-footer {
		margin-top: 1.5rem;
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}
</style>
