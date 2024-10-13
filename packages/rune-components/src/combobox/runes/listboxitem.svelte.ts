import type { ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';
import { stateIs } from '@svelte-thing/component-utils/reactivity';

export interface CreateComboboxListboxItemConfig<TOption> {
	combobox: ComboboxRoot<TOption>;
	item: TOption;
}

export type ComboboxListboxItem = ReturnType<typeof createListboxItem>;

export function createListboxItem<TOption>(
	config: CreateComboboxListboxItemConfig<TOption>,
) {
	const { combobox } = config;

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
		props: {
			'data-st-combobox-listbox-item': '',
			get ['aria-selected']() {
				return stateIs(config.item, combobox.value) || undefined;
			},
			role: 'option',
			onclick() {
				combobox.setValue(config.item);
				combobox.close();
			},
			get ['data-active-item']() {
				return stateIs(config.item, combobox.activeItem) || undefined;
			},
		},
	} satisfies RuneComponent<'li'>;
}
