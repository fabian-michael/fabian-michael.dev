export const THEME_DARK = 'night';
export const THEME_LIGHT = 'winter';

export type Theme = null | typeof THEME_DARK | typeof THEME_LIGHT;

let theme = $state<Theme>(null);

export const ThemeStore = {
    get theme() {
        return theme;
    },
    set theme(newTheme: Theme) {
        theme = newTheme;
    },
    toggleTheme() {
        theme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    },
};

$effect.root(() => {
    const root = document.documentElement;
    theme = localStorage.getItem('theme') as Theme;

    window.addEventListener('storage', (event: StorageEvent) => {
        if (event.key === 'theme') {
            theme = event.newValue as Theme;
        }
    });

    $effect(() => {
        if (theme) {
            root.dataset.theme = theme;
            localStorage.setItem('theme', theme);
        } else {
            delete root.dataset.theme;
            localStorage.removeItem('theme');
        }
    });
});