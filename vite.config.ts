import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    plugins: [
        sveltekit(),
        Icons({
            compiler: 'svelte',
        }),
        paraglide({
            project: './project.inlang',
            outdir: './src/lib/paraglide',
        }),
        glsl(),
    ],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}'],
    },
});
