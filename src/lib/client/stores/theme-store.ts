import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type Theme = 'dark' | 'light' | '';

export const themeStore = (() => {
    const store = writable<Theme>('');

    if (browser) {
        const theme = window.getTheme();
        store.set(theme ?? '');
    }

    return {
        subscribe: store.subscribe,
        set: (theme: Theme) => {
            window.setTheme(theme);
            store.set(theme);
        }
    }
})();