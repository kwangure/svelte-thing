import { getContext, setContext } from 'svelte';
import {
	createCombobox,
	type CreateCombmboxConfig,
	type ComboboxBuilder,
} from './root.svelte.js';

export const comboboxContextKey = Symbol('combobox');

export function setComboboxContext<TOption>(
	options: CreateCombmboxConfig<TOption>,
) {
	const combobox = createCombobox<TOption>(options);
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
	return combobox as ComboboxBuilder<TOption>;
}
