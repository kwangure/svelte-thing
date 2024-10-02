<script>
	import './layout.css';
	import { Navbar, Shell } from '../lib/components/index.js';
	import { createDarkModeButton } from '../lib/creators';
	import { Darkmode } from '../lib/components/index.js';

	const button = createDarkModeButton();
</script>

<Darkmode />

<Shell.Root>
	<Navbar.Root>
		<div class="ml-auto">
			<Navbar.Button {...button.props}>
				Switch to {button.theme === 'dark' ? 'Light' : 'Dark'} mode
			</Navbar.Button>
		</div>
	</Navbar.Root>
	<slot />
</Shell.Root>
