<script lang="ts">
    import {initStars} from "./stars.svelte";
    import {initClouds} from "./clouds.svelte.js";

    let parallaxContainer: HTMLDivElement;
    let scrollProgress = $state(0);
    let skyContainer: HTMLDivElement;
    let skyCanvas: HTMLCanvasElement;


    // handle scroll
    $effect(() => {
        const handleScroll = () => {
            if (!parallaxContainer) return;

            const rect = parallaxContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate the scroll progress
            const start = rect.top + window.scrollY;
            const end = start + parallaxContainer.scrollHeight - windowHeight;
            // scrollProgress = progress;
            scrollProgress = Math.min(
                Math.max((window.scrollY - start) / (end - start), 0),
                1,
            );
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    $effect(() => {
        if (!skyCanvas) return;

        initStars(skyCanvas);
        initClouds(skyContainer);
    });
</script>

<div
    class="h-[300dvh] absolute top-0 w-screen"
    bind:this={parallaxContainer}
    style="--scroll-progress: {scrollProgress};"
>
    <div class="sticky top-0 h-screen overflow-clip parallax-inner">
        <div class="absolute h-[calc(100dvh+100px)] w-screen top-0 sky">
            <div class="absolute inset-0" bind:this={skyContainer}>
                <canvas
                    bind:this={skyCanvas}
                    class="absolute h-[calc(100dvh)] w-screen top-0 -z-10"
                ></canvas>
            </div>
        </div>

        <div
            class="absolute h-[calc(100dvh+100px)] w-screen top-0 mountains"
        ></div>
        <div class="noise absolute inset-0"></div>
        <div class="absolute w-screen h-screen grid place-content-center top-0">
            <h1 class="text-center text-6xl font-bold">
                hi, I'm Fabian
            </h1>
        </div>
    </div>
</div>

<div class="relative pt-[50dvh]">

    <svg
        viewBox="0 0 360.56435 237.74781"
        class="w-full h-auto text-white dark:text-[#010109] relative -bottom-12 blur-sm scale-105"
    >
        <use href="/images/foreground.svg#foreground"/>
    </svg>

    <div class="bg-white dark:bg-[#010109] content min-h-[150dvh]">
        <div class="container relative prose">
            <h2>Recent blog postings</h2>
        </div>
    </div>
</div>


<style>
    .sky {
        --initial-translate-y: 0px;
        --final-translate-y: -100px;
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

        --initial-translate-y: 0px;
        --final-translate-y: -200px;
        --translate-y: calc(
            var(--initial-translate-y) +
            (var(--final-translate-y) - var(--initial-translate-y)) *
            var(--scroll-progress)
        );

        transform: translateY(var(--translate-y));
        filter: brightness(120%) saturate(80%);
    }

    .noise {
        background: #000000;
        mix-blend-mode: screen;
        opacity: 0.7;
        filter: url("/images/noise.svg#noiseFilter");

        --initial-translate-y: 0px;
        --final-translate-y: -200px;
        --translate-y: calc(
            var(--initial-translate-y) +
            (var(--final-translate-y) - var(--initial-translate-y)) *
            var(--scroll-progress)
        );

        transform: translateY(var(--translate-y));
    }

    .content {
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
