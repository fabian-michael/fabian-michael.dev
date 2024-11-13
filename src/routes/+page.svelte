<script lang="ts">
    import {initStars} from "./stars.svelte";
    import {initClouds} from "./clouds.svelte.js";
    import {scrollProgress} from "$lib/client/actions/scrollProgress";

    let skyContainer: HTMLDivElement;
    let skyCanvas: HTMLCanvasElement;

    $effect(() => {
        if (!skyCanvas) return;

        initStars(skyCanvas);
        initClouds(skyContainer);
    });
</script>

<svg
    class="sr-only"
    aria-hidden="true"
>
    <defs>
        <filter id="noiseFilter">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="1.2"
                numOctaves="16"
                stitchTiles="stitch"
            />
        </filter>
    </defs>
</svg>

<div
    class="h-[400dvh] absolute top-0 w-screen"
    use:scrollProgress={{
        onChange: (progress, element) => element.style.setProperty('--scroll-progress', String(progress)),
    }}
>
    <div class="sticky top-0 h-screen overflow-clip parallax-inner">
        <div class="absolute h-[calc(100dvh+100px)] w-screen top-0 sky">
            <div
                class="absolute inset-0"
                bind:this={skyContainer}
            >
                <canvas
                    bind:this={skyCanvas}
                    class="absolute h-[calc(100dvh)] w-screen top-0 -z-10"
                ></canvas>
            </div>
        </div>

        <div
            class="absolute h-[calc(100dvh+100px)] w-screen top-0 mountains"
        ></div>
        <div class="noise absolute inset-0 -top-[100px]"></div>
    </div>
</div>

<section
    class="relative w-screen h-screen grid place-content-center top-0"
    use:scrollProgress={{
        offset: ['20% start', 'end 60%'],
        onChange: (progress, element) => element.style.opacity = String(1 - progress),
    }}
>
    <h1 class="text-center text-6xl font-bold">
        hi, I'm Fabian
    </h1>
</section>

<section
    class="relative w-screen h-screen grid place-content-center top-0"
    use:scrollProgress={{
        offset: ['20% start', 'end 60%'],
        onChange: (progress, element) => element.style.opacity = String(1 - progress),
    }}
>
    <p class="text-center text-2xl max-w-3xl">
        I'm a dedicated web developer with a passion for creating beautiful and functional websites.
    </p>
</section>

<section class="relative">

    <svg
        viewBox="0 0 360.56435 237.74781"
        class="w-full h-auto text-white dark:text-[#010109] relative -bottom-12 scale-105"
    >
        <use href="/images/foreground.svg#foreground"/>
    </svg>

    <div class="bg-white dark:bg-[#010109] content min-h-[150dvh]">
        <div class="container relative">
            <div class="prose">
                <h2>Recent blog postings</h2>
                <p>Explose my recent blog postings, where I unravel the latest trends, hacks, and breakthroughs in web
                   development. Dive right in and level up your coding game!</p>
            </div>
        </div>
    </div>
</section>


<style>
    .sky {
        --initial-translate-y: 0px;
        --final-translate-y: -50px;
        --translate-y: calc(
            var(--initial-translate-y) +
            (var(--final-translate-y) - var(--initial-translate-y)) *
            var(--scroll-progress)
        );

        transform: translateY(var(--translate-y));

        --bg-gradient-top: theme("colors.blue.300");
        --bg-gradient-bottom: theme("colors.blue.100");
        --gradient-angle: 175deg;
        --gradient-start: 10%;
        --gradient-end: 60%;

        background-image: linear-gradient(
            var(--gradient-angle),
            var(--bg-gradient-top) var(--gradient-start),
            var(--bg-gradient-bottom) var(--gradient-end)
        );
    }

    .mountains {
        background: url("/images/mountains.png") no-repeat center center;
        background-size: cover;

        --initial-translate-y: 100px;
        --final-translate-y: 0px;
        --translate-y: calc(
            var(--initial-translate-y) +
            (var(--final-translate-y) - var(--initial-translate-y)) *
            var(--scroll-progress)
        );

        transform: translateY(var(--translate-y));
        filter: brightness(130%) saturate(80%) contrast(70%);
    }

    .noise {
        background: #000000;
        mix-blend-mode: screen;
        opacity: 0.8;
        filter: url("#noiseFilter");

        --initial-translate-y: 100px;
        --final-translate-y: 0px;
        --translate-y: calc(
            var(--initial-translate-y) +
            (var(--final-translate-y) - var(--initial-translate-y)) *
            var(--scroll-progress)
        );

        transform: translateY(var(--translate-y));
    }

    :global([data-theme="night"]) {
        .sky {
            --bg-gradient-top: theme("colors.slate.950");
            --bg-gradient-bottom: theme("colors.slate.800");

            &::after {
                /* overlay stars to make them dimmer towards the bottom */
                content: "";
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    var(--gradient-angle),
                    rgba(0, 0, 0, 0) var(--gradient-start),
                    var(--bg-gradient-bottom) var(--gradient-end)
                );
            }
        }

        .mountains {
            background-image: url("/images/mountains-dark.png");
            filter: none;
        }

        .noise {
            opacity: 0.2;
        }
    }
</style>
