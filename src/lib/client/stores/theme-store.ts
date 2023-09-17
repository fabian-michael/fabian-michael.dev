import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type Theme = 'night' | 'light' | '';

export const themeStore = (() => {
    const store = writable<Theme>(undefined, (set) => {
        if (!browser) {
            return
        };

        const theme = localStorage.getItem('theme') as Theme;
        set(theme);

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
                return
            };

            window.setTheme(theme);
            store.set(theme);
        }
    }
})();