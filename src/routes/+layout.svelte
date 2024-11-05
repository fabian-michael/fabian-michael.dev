<script lang="ts">
	import { THEME_DARK, ThemeStore } from '$lib/client/stores/ThemeStore.svelte';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import LineMdMoonAltToSunnyOutlineLoopTransition from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition';
	import LineMdSunnyOutlineToMoonAltLoopTransition from '~icons/line-md/sunny-outline-to-moon-alt-loop-transition';
	import '../app.css';
	let { children } = $props();

</script>

<ParaglideJS {i18n}>
	{@render children()}
    <div class="fixed top-0 flex items-center justify-between w-full p-4">
        <div>
            <a href="/" class="inline-block" aria-label="Home">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192.5 31.8"
                    width="192.5"
                    height="31.8"
                >
                    <use href="/images/fm-logo.svg#fm-logo" />
                </svg>
            </a>
        </div>
        <div>
            <button class="btn btn-sm btn-square btn-ghost" onclick={() => ThemeStore.toggleTheme()}>
                {#if ThemeStore.theme === THEME_DARK}
                    <LineMdSunnyOutlineToMoonAltLoopTransition />
                {:else}
                    <LineMdMoonAltToSunnyOutlineLoopTransition />
                {/if}
            </button>
        </div>
    </div>
</ParaglideJS>
