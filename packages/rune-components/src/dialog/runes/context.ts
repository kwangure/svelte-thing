import { getContext, setContext } from 'svelte';
import {
	createDialogRoot,
	type CreateDialogRootConfig,
	type DialogRoot,
} from './root.svelte.js';

export const dialogContextKey = Symbol('dialog');

export function setDialogContext(options: CreateDialogRootConfig) {
	const dialog = createDialogRoot(options);
	setContext(dialogContextKey, dialog);
	return dialog;
}

export function getDialogContext() {
	const dialog = getContext(dialogContextKey);
	if (!dialog) {
		throw new Error(
			'Dialog context not found. Wrap dialog child in a root element.',
		);
	}
	return dialog as DialogRoot;
}
