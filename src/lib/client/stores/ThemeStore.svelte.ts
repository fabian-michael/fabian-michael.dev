export const THEME_DARK = 'night';
export const THEME_LIGHT = 'winter';

export type Theme = null | typeof THEME_DARK | typeof THEME_LIGHT;

type ThemeStore = {
    // state
    theme: Theme;

    // actions
    toggleTheme(): void;
};

export const ThemeStore = $state<ThemeStore>({
    // state
    theme: null,

    // actions
    toggleTheme() {
        this.theme = this.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    },
});

$effect.root(() => {
    const root = document.documentElement;
    ThemeStore.theme = localStorage.getItem('theme') as Theme;

    window.addEventListener('storage', (event: StorageEvent) => {
        if (event.key === 'theme') {
            ThemeStore.theme = event.newValue as Theme;
        }
    });

    $effect(() => {
        if (ThemeStore.theme) {
            root.dataset.theme = ThemeStore.theme;
            localStorage.setItem('theme', ThemeStore.theme);
        } else {
            delete root.dataset.theme;
            localStorage.removeItem('theme');
        }
    });
});