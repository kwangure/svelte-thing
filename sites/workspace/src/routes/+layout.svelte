<script>
	import '@svelte-thing/components/css/preflight';
	import '@svelte-thing/components/css/color';
	import '$lib/css/app.css';

	import { Darkmode, Shell, Sidebar } from '@svelte-thing/components';
	import { page as pageStore } from '$app/stores';

	const { children } = $props();
	const pathname = $derived($pageStore.url.pathname);
</script>

<Darkmode />

<Shell.Root>
	<Sidebar.Root>
		<Sidebar.Section title="Components">
			<Sidebar.Item>
				<Sidebar.Section title="combobox">
					<Sidebar.Item>
						<Sidebar.Link
							href="/combobox/autocomplete"
							aria-current={pathname === `/combobox/autocomplete`}
						>
							Autocomplete
						</Sidebar.Link>
					</Sidebar.Item>
					<Sidebar.Item>
						<Sidebar.Link
							href="/combobox/dialog"
							aria-current={pathname === `/combobox/dialog`}
						>
							Dialog
						</Sidebar.Link>
					</Sidebar.Item>
				</Sidebar.Section>
			</Sidebar.Item>
			<Sidebar.Item>
				<Sidebar.Link
					href="/dialog"
					aria-current={pathname === `/dialog`}
				>
					Dialog
				</Sidebar.Link>
			</Sidebar.Item>
		</Sidebar.Section>
	</Sidebar.Root>
	<Shell.Main>
		<div>{@render children()}</div>
	</Shell.Main>
</Shell.Root>

<style>
	div {
		padding-inline: var(--st-breakpoint-lg) var(--st-size-6);
		margin-block-end: var(--st-size-40);
	}
</style>
