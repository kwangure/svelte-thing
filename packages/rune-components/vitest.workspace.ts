import { defineWorkspace } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineWorkspace([
	{
		plugins: [svelte()],
		test: {
			exclude: ['.svelte-kit/**', '.wireit/**', 'dist/**'],
			browser: {
				enabled: true,
				headless: true,
				name: 'chromium',
				provider: 'playwright',
				// https://playwright.dev
				providerOptions: {},
			},
			includeTaskLocation: true,
		},
	},
]);
