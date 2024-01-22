<script>
	import './layout.css';
	import { Navbar, Shell } from '../lib/components/index.js';
	import { createDarkModeButton } from '../lib/creators/index.js';
	import { Darkmode } from '../lib/components/index.js';

	const { elements, state } = createDarkModeButton();
	const { button } = elements;
	const { mode } = state;
</script>

<Darkmode />

<Shell.Root>
	<Navbar.Root>
		<div class="ml-auto">
			<Navbar.Button action={button}>
				Switch to {$mode === 'dark' ? 'Light' : 'Dark'} mode
			</Navbar.Button>
		</div>
	</Navbar.Root>
	<slot />
</Shell.Root>
