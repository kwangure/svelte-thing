import { getContext, setContext } from 'svelte';
import { createTabs } from '@melt-ui/svelte';

const TAB_CONTEXT = '__TAB_CONTEXT__';

export type MeltTabs = ReturnType<typeof createTabs>;

export function createTabsContext() {
	const tabs: MeltTabs = createTabs();
	setContext(TAB_CONTEXT, tabs);
	return tabs;
}

export function getTabContext() {
	const tabs = getContext(TAB_CONTEXT);
	return tabs as MeltTabs;
}
