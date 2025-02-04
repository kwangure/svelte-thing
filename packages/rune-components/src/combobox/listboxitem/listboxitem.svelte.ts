import type { Option, TRoot } from '../root/root.svelte.js';
import type { RuneComponent } from '../../types.js';

export interface CreateListboxItemConfig<TValue> {
	root: TRoot<TValue>;
	item: Option<TValue>;
}

export type TListboxItem = ReturnType<typeof createListboxItem>;

export function createListboxItem<TValue>(
	config: CreateListboxItemConfig<TValue>,
) {
	const { root } = config;
	const isFocused = $derived(config.item.key === root.activeItem?.key);
	const isSelected = $derived(config.item.key === root.value?.key);

	return {
		action(element) {
			const unsub1 = root.onSetActiveItem((value) => {
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
				root.setValue(config.item);
				root.close();
			},
			get ['data-active-item']() {
				return isFocused || undefined;
			},
		},
	} satisfies RuneComponent<'li'>;
}
