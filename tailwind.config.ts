import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    darkMode: ['class', '[data-theme="night"]'],
    daisyui: {
        themes: [
            'night',
            'winter',
        ],
        darkTheme: 'night',
    },

    theme: {
        screens: {
            xs: '475px',
            ...defaultTheme.screens,
        },

        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
            },
            screens: {
                xs: '475px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
        },

        extend: {
            aspectRatio: {
                wide: '21 / 9',
            },
            fontFamily: {
                'pacifico': ['Pacifico', 'cursive'],
                'overpass': ['Overpass', 'cursive'],
                'poppins': ['Poppins', 'cursive'],
                'sans': ['Poppins', 'sans-serif'],
                'symbols': ['Material Symbols Rounded', 'sans-serif'],
            },
            height: {
                'screen': '100dvh',
            },
            minHeight: {
                'screen': '100dvh',
            },
            maxHeight: {
                'screen': '100dvh',
            },
        },
    },

    plugins: [
        typography,
        containerQueries,
        aspectRatio,
        daisyui,
    ],
} as Config;
