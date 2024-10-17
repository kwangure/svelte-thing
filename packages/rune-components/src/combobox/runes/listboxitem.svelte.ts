import type { ComboboxOption, ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateComboboxListboxItemConfig<TValue> {
	combobox: ComboboxRoot<TValue>;
	item: ComboboxOption<TValue>;
}

export type ComboboxListboxItem = ReturnType<typeof createListboxItem>;

export function createListboxItem<TValue>(
	config: CreateComboboxListboxItemConfig<TValue>,
) {
	const { combobox } = config;
	const isFocused = $derived(config.item.key === combobox.activeItem?.key);
	const isSelected = $derived(config.item.key === combobox.value?.key);

	return {
		action(element) {
			const unsub1 = combobox.onSetActiveItem((value) => {
				if (Object.is(config.item, value)) {
					element.scrollIntoView({ block: 'nearest' });
				}
			});

			return {
				destroy() {
					unsub1();
				},
			};
		},
		get isSelected() {
			return isSelected;
		},
		props: {
			'data-st-combobox-listbox-item': '',
			get ['aria-selected']() {
				return isSelected || undefined;
			},
			role: 'option',
			onclick() {
				combobox.setValue(config.item);
				combobox.close();
			},
			get ['data-active-item']() {
				return isFocused || undefined;
			},
		},
	} satisfies RuneComponent<'li'>;
}
