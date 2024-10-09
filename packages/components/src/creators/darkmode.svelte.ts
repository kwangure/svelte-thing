import { BROWSER, DEV } from 'esm-env';
import { on } from 'svelte/events';

export type Theme = 'dark' | 'light';

const DARK = 'dark';
const LIGHT = 'light';

export const THEME_LOCAL_STORAGE_KEY = 'sv-theme';
export const DEFAULT_THEME: Theme = DARK;

let __theme = $state<Theme>();

const theme = {
	get current() {
		return __theme;
	},
	set current(t) {
		__theme = t;
		if (BROWSER) {
			document.documentElement.classList.add(t === DARK ? DARK : LIGHT);
			document.documentElement.classList.remove(
				t === DARK ? LIGHT : DARK,
			);
		}
	},
};

function parseTheme(theme: unknown) {
	if (theme === DARK || theme === LIGHT) return theme;
	if (DEV) {
		throw Error(
			`Invalid theme value. Expected "dark" or "light", but found ${JSON.stringify(
				theme,
			)} instead.`,
		);
	}
	return DEFAULT_THEME;
}

export function createDarkModeButton() {
	if (BROWSER) {
		theme.current = parseTheme(
			localStorage.getItem(THEME_LOCAL_STORAGE_KEY) ?? DEFAULT_THEME,
		);
	} else {
		theme.current = DEFAULT_THEME;
	}

	if (BROWSER) {
		on(window, 'storage', (event) => {
			if (
				typeof event.key === 'string' &&
				event.key !== THEME_LOCAL_STORAGE_KEY
			)
				return;

			// caused by localStorage.clear();
			if (event.key === null) {
				theme.current = DEFAULT_THEME;
			} else {
				theme.current = parseTheme(event.newValue ?? DEFAULT_THEME);
			}
		});
	}

	return {
		get theme() {
			return theme.current;
		},
		props: {
			onclick() {
				theme.current = theme.current === DARK ? LIGHT : DARK;
				localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme.current);
			},
		},
	};
}
