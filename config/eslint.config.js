import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

const { browser, es2021, node } = globals;

export default [
	{
		ignores: [
			'**/.svelte-kit/',
			'**/.wireit/',
			'**/dist/', // package output
			'**/build/', // site output
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...tseslint.configs.stylistic,
	{
		languageOptions: {
			globals: {
				...browser,
				...es2021,
				...node,
			},
		},
		rules: {
			// Disable in favour of @typescript-eslint/no-unused-vars which
			// understands that function arguments in types are always unused
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					args: 'all',
				},
			],
			'@typescript-eslint/method-signature-style': ['error', 'property'],
			'require-await': 'error',
			...prettier.rules,
		},
	},
	{
		files: ['**/*.js', '**/*.ts', '**/*.mjs', '**/*.cjs'],
		languageOptions: {
			globals: {
				...browser,
				...es2021,
				...node,
			},
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
			globals: {
				...browser,
				...es2021,
			},
		},
		plugins: {
			svelte: sveltePlugin,
		},
		processor: 'svelte/svelte',
		rules: {
			...js.configs.recommended.rules,
			...sveltePlugin.configs.recommended.rules,
			'no-inner-declarations': 'off',
		},
	},
];
