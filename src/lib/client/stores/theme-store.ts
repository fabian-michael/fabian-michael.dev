import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = typeof THEMES[number];
export const THEMES = ['dark', 'light', ''] as const;
export const DARK_THEME: Theme = 'dark';
export const LIGHT_THEME: Theme = 'light';
export const SYSTEM_THEME = '';

export const themeStore = (() => {
    const store = writable<Theme>(undefined, (set) => {
        if (!browser) {
            return;
        }

        const theme = localStorage.getItem('theme') as Theme;
        if (!THEMES.includes(theme)) {
            set(SYSTEM_THEME);
        } else {
            set(theme);
        }

        function handleThemeChange(event: StorageEvent) {
            if (event.key === 'theme') {
                const theme = event.newValue as Theme;
                set(theme);
            }
        }

        window.addEventListener('storage', handleThemeChange);

        return () => {
            window.removeEventListener('storage', handleThemeChange);
        };
    });

    return {
        subscribe: store.subscribe,
        set: (theme: Theme) => {
            if (!browser) {
                return;
            }

            window.setTheme(theme);
            store.set(theme);
        },
    };
})();
