<!--
	@component

	Dialog presents a dialog box or modal.
-->
<script lang="ts">
	import '@svelte-thing/components/css/breakpoint';
	import '@svelte-thing/components/css/motion';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { createDialogRoot } from './root.svelte.js';
	import { mergeProps } from '@svelte-thing/component-utils';

	interface Props extends HTMLDialogAttributes {
		children: Snippet;
		hideOnInteractOutside?: boolean | undefined;
		isModal?: boolean;
	}
	const {
		children,
		hideOnInteractOutside,
		isModal,
		open: isOpen,
		...restProps
	}: Props = $props();

	const dialog = createDialogRoot({ isModal, isOpen });
	$effect(() => dialog.setHideOnInteractOutside(hideOnInteractOutside));
	$effect(() => dialog.setIsModal(isModal));
	$effect(() => dialog.setIsOpen(isOpen));
</script>

<dialog
	class:modal={dialog.isModal}
	{...mergeProps(restProps, dialog.props)}
	use:dialog.action
>
	{@render children()}
</dialog>

<style>
	/* Prevent scrolling when modal dialog is open */
	:global(html):has(dialog[open].modal) {
		overflow: hidden;
	}
	dialog {
		align-items: start;
		animation: var(--st-motion-no-preference) slide-out-down 0.5s
			cubic-bezier(0.25, 0, 0.3, 1) forwards;
		animation-timing-function: cubic-bezier(0.5, -0.5, 0.1, 1.5);
		--_background-color-dark: var(--st-color-preference-dark) #222;
		background-color: var(--_background-color-dark, #fff);
		border: 1px solid transparent;
		border-block-start: var(--st-color-preference-dark) 1px solid #394047;
		border-radius: var(--st-size-1);
		box-shadow: 0 var(--st-size-0_5) var(--st-size-2) #111;
		color: inherit;
		display: flex;
		flex-direction: column;
		inset: 0;
		margin: auto;
		max-inline-size: min(90vw, 60ch);
		max-block-size: min(80vh, 100%);
		overflow: hidden;
		padding-block: var(--st-size-4);
		padding-inline: var(--st-size-6);
		position: fixed;
		transition: opacity 0.5s cubic-bezier(0.25, 0, 0.3, 1);
		z-index: 100000;
	}
	dialog[open] {
		animation: var(--st-motion-no-preference) slide-in-up 0.5s
			cubic-bezier(0.25, 0, 0.3, 1) forwards;
	}
	dialog.modal {
		--_border-end-end-radius: var(--st-breakpoint-not-md) 0px;
		border-end-end-radius: var(--_border-end-end-radius, var(--st-size-1));
		--_border-end-start-radius: var(--st-breakpoint-not-md) 0px;
		border-end-start-radius: var(--_border-end-start-radius, var(--st-size-1));
		--_margin-block-end: var(--st-breakpoint-not-md) 0px;
		margin-block-end: var(--_margin-block-end, auto);
	}

	@keyframes slide-out-down {
		to {
			transform: translateY(100%);
		}
	}

	@keyframes slide-in-up {
		from {
			transform: translateY(100%);
		}
	}

	dialog:not([open]) {
		pointer-events: none;
		opacity: 0;
	}

	dialog::backdrop {
		transition: background-color 0.25s ease;
	}

	dialog.modal::backdrop {
		--_background-color-dark: var(--st-color-preference-dark)
			rgba(50, 50, 50, 0.5);
		background-color: var(--_background-color-dark, rgba(0, 0, 0, 0.5));
		opacity: 1;
	}

	dialog:not(.modal)::backdrop {
		background-color: transparent;
	}
</style>
