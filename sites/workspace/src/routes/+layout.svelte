<script>
	import '@svelte-thing/css/base';
	import '@svelte-thing/css/combobox';
	import '@svelte-thing/css/dialog';
	import '@svelte-thing/css/menu';

	import {
		Darkmode,
		Icon,
		Navbar,
		Shell,
		Sidebar,
	} from '@svelte-thing/components';
	import { page } from '$app/state';
	import { createDarkModeButton } from '@svelte-thing/components/creators';
	import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';

	const { children } = $props();
	const pathname = $derived(page.url.pathname);
	const darkMode = createDarkModeButton();
</script>

<Darkmode />

<Shell.Root>
	<Navbar.Root>
		<div style="margin-inline-start: auto;">
			<Icon.Button
				label="Switch to {darkMode.theme === 'dark'
					? 'light'
					: 'dark'} mode"
				path={darkMode.theme == 'dark'
					? mdiWhiteBalanceSunny
					: mdiWeatherNight}
				{...darkMode.props}
			/>
		</div>
	</Navbar.Root>
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
			<Sidebar.Link href="/menu" aria-current={pathname === `/menu`}>
				Menu
			</Sidebar.Link>
		</Sidebar.Section>
	</Sidebar.Root>
	<Shell.Main>
		<div class="layout">{@render children()}</div>
	</Shell.Main>
</Shell.Root>

<style>
	.layout {
		padding-inline: var(--st-breakpoint-lg) var(--st-size-6);
		margin-block-end: var(--st-size-40);
	}
</style>
