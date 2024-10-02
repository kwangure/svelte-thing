import { getContext, setContext } from 'svelte';
import {
	createComboboxRoot,
	type CreateCombmboxRootConfig,
	type ComboboxRoot,
} from './root.svelte.js';

export const comboboxContextKey = Symbol('combobox');

export function setComboboxContext<TOption>(
	options: CreateCombmboxRootConfig<TOption>,
) {
	const combobox = createComboboxRoot<TOption>(options);
	setContext(comboboxContextKey, combobox);
	return combobox;
}

export function getComboboxContext<TOption>() {
	const combobox = getContext(comboboxContextKey);
	if (!combobox) {
		throw new Error(
			'Combobox context not found. Wrap combobox child in a root element.',
		);
	}
	return combobox as ComboboxRoot<TOption>;
}
