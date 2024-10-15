import { getContext, setContext } from 'svelte';
import {
	createComboboxRoot,
	type CreateComboboxRootConfig,
	type ComboboxRoot,
} from './root.svelte.js';

export const comboboxContextKey = Symbol('combobox');

export function setComboboxContext<TValue>(
	options: CreateComboboxRootConfig<TValue>,
) {
	const combobox = createComboboxRoot<TValue>(options);
	setContext(comboboxContextKey, combobox);
	return combobox;
}

export function getComboboxContext<TValue>() {
	const combobox = getContext(comboboxContextKey);
	if (!combobox) {
		throw new Error(
			'Combobox context not found. Wrap combobox child in a root element.',
		);
	}
	return combobox as ComboboxRoot<TValue>;
}
