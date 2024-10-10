import type { ComboboxRoot } from './root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateComboboxListboxItemConfig<TOption> {
	combobox: ComboboxRoot<TOption>;
	item: TOption;
}

export type ComboboxListboxItem = ReturnType<typeof createListboxItem>;

export function createListboxItem<TOption>(
	config: CreateComboboxListboxItemConfig<TOption>,
) {
	const { combobox } = config;
	const isActive = $derived(Object.is(config.item, combobox.activeItem));

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
				return isActive;
			},
			role: 'option',
			onclick() {
				combobox.setValue(config.item);
				combobox.close();
			},
			get ['data-active-item']() {
				return isActive || undefined;
			},
			get ['data-focus-visible']() {
				return isActive || undefined;
			},
		},
	} satisfies RuneComponent<'li'>;
}
