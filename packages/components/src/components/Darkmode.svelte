<script lang="ts">
	import { createRawSnippet } from 'svelte';
	import { DEFAULT_THEME, THEME_LOCAL_STORAGE_KEY } from '../creators';

	const s = 'script';
	const darkModeScript = createRawSnippet(() => {
		return {
			render: () =>
				`<${s}>
				var t = localStorage.getItem("${THEME_LOCAL_STORAGE_KEY}") ?? "${DEFAULT_THEME}";
				var c = document.documentElement.classList;
				c.add(t === 'dark' ? 'dark': 'light');
				c.remove(t === 'dark' ? 'light': 'dark');
			</${s}>`,
		};
	});
</script>

<svelte:head>
	{@render darkModeScript()}
</svelte:head>
