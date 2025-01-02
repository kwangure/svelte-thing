import { defineWorkspace } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineWorkspace([
	{
		plugins: [svelte()],
		test: {
			exclude: ['.svelte-kit/**', '.wireit/**', 'dist/**'],
			browser: {
				api: { port: 1234 },
				enabled: true,
				headless: true,
				provider: 'playwright',
				instances: [{ browser: 'chromium' }],
			},
			includeTaskLocation: true,
		},
	},
]);
