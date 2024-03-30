import { get, writable } from 'svelte/store';

/**
 * @template {any} T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
function getLocalStorageItem(key, fallback) {
	try {
		const item = localStorage.getItem(key);
		if (!item) return fallback;
		return JSON.parse(item);
	} catch (error) {
		return fallback;
	}
}

/**
 * @param {string} key
 * @param {any} value
 */
function setLocalStorageItem(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		if (
			/** @type {any} */ (error).message.includes('localStorage is not defined')
		)
			return;
		throw error;
	}
}

/**
 * @param {'light' | 'dark'} to
 */
function setThemeClassName(to) {
	try {
		if (to === 'dark') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		} else if (to == 'light') {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		}
	} catch (error) {
		if (/** @type {any} */ (error).message.includes('document is not defined'))
			return;
		throw error;
	}
}

const THEME_LOCAL_STORAGE_KEY = 'theme';
const DEFAULT_THEME = /** @type {'light' | 'dark'} */ ('dark');

export function createDarkmodeScriptTag() {
	return [
		'<script>',
		`    ${getLocalStorageItem.toString()};`,
		`    ${setThemeClassName.toString()};`,
		`    var currentTheme = getLocalStorageItem("${THEME_LOCAL_STORAGE_KEY}", "${DEFAULT_THEME}");`,
		`    setThemeClassName(currentTheme);`,
		'</script>',
	].join('\n');
}

/**
 * Use shared theme store across all instances
 *
 * @type {import("svelte/store").Writable<typeof DEFAULT_THEME>}
 */
let theme;

export function createDarkModeButton() {
	if (!theme) {
		theme = writable(
			getLocalStorageItem(THEME_LOCAL_STORAGE_KEY, DEFAULT_THEME),
		);
	}

	function handleClick() {
		const newMode = get(theme) === 'dark' ? 'light' : 'dark';
		theme.set(newMode);
		setLocalStorageItem(THEME_LOCAL_STORAGE_KEY, newMode);
		setThemeClassName(newMode);
	}

	/**
	 * @param {HTMLElement} node
	 */
	function button(node) {
		node.addEventListener('click', handleClick);

		return {
			destroy() {
				node.removeEventListener('click', handleClick);
			},
		};
	}

	return {
		elements: { button },
		state: { mode: { subscribe: theme.subscribe } },
	};
}
