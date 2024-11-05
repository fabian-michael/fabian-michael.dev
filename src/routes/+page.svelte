<script lang="ts">
    let paralaxContainer: HTMLDivElement;
    let scrollProgress = $state(0);
    let starsCanvas: HTMLCanvasElement;
    const STARS_COUNT = 5000;
    const STAR_MIN_BRIGHTNESS = 0.3;
    const STAR_MAX_BRIGHTNESS = 1;
    const STAR_MIN_RADIUS = 0.2;
    const STAR_MAX_RADIUS = 1;

    function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
        return (t: number) => {
            const p0 = 0;
            const p1 = y1;
            const p2 = y2;
            const p3 = 1;

            const a =
                p0 * (1 - t) ** 3 +
                3 * p1 * t * (1 - t) ** 2 +
                3 * p2 * t ** 2 * (1 - t) +
                p3 * t ** 3;
            return a;
        };
    }

    const inOutSine = cubicBezier(0.37, 0, 0.63, 1);

    function clamp(min: number, value: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }

    // handle scroll
    $effect(() => {
        const handleScroll = () => {
            if (!paralaxContainer) return;

            const rect = paralaxContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate the scroll progress
            const start = rect.top + window.scrollY;
            const end = start + paralaxContainer.scrollHeight - windowHeight;
            const progress = Math.min(
                Math.max((window.scrollY - start) / (end - start), 0),
                1,
            );

            // scrollProgress = progress;
            scrollProgress = progress;
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    // paint stars
    $effect(() => {
        if (!starsCanvas) return;

        const ctx = starsCanvas.getContext("2d") as CanvasRenderingContext2D;

        // Set canvas dimensions to match window size
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;

        // Type for star properties
        interface Star {
            x: number;
            y: number;
            radius: number;
            brightness: number;
        }

        // Function to draw a star with given properties
        function drawStar(star: Star): void {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            ctx.fill();
        }

        // Function to generate random stars
        function generateStars(count: number): Star[] {
            const stars: Star[] = [];
            for (let i = 0; i < count; i++) {
                const star: Star = {
                    x: Math.random() * starsCanvas.width,
                    y: Math.random() * starsCanvas.height,
                    radius:
                        Math.random() ** 50 *
                            (STAR_MAX_RADIUS - STAR_MIN_RADIUS) +
                        STAR_MIN_RADIUS,
                    brightness: Math.random(),
                };

                drawStar(star);
                stars.push(star);
            }

            return stars;
        }

        let animationFrame: number;
        function twinklingStars(stars: Star[]): void {
            ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
            stars.forEach((star) => {
                star.brightness = clamp(
                    STAR_MIN_BRIGHTNESS,
                    star.brightness + (Math.random() - 0.5) * 0.1,
                    STAR_MAX_BRIGHTNESS,
                );

                drawStar(star);
            });
            animationFrame = requestAnimationFrame(() => twinklingStars(stars));
        }

        // Initial star drawing
        const stars = generateStars(STARS_COUNT);
        twinklingStars(stars);

        const handleResize = () => {
            starsCanvas.width = window.innerWidth;
            starsCanvas.height = window.innerHeight;
            ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
            const stars = generateStars(STARS_COUNT);
            cancelAnimationFrame(animationFrame);
            twinklingStars(stars);
        };

        const throttle = (callback: () => void, delay: number) => {
            let previousCall = new Date().getTime();
            return function () {
                const time = new Date().getTime();

                if (time - previousCall >= delay) {
                    previousCall = time;
                    callback();
                }
            };
        };

        const handleResizeThrottled = throttle(handleResize, 100);

        // Handle window resize to redraw stars
        window.addEventListener("resize", handleResizeThrottled);

        return () => {
            window.removeEventListener("resize", handleResizeThrottled);
            ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
            cancelAnimationFrame(animationFrame);
        };
    });
</script>

<div
    class="h-[150dvh]"
    bind:this={paralaxContainer}
    style="--scroll-progress: {scrollProgress};"
>
    <div class="sticky top-0 h-screen overflow-clip">
        <div class="absolute h-[calc(100dvh+100px)] w-screen top-0 sky">
            <div class="absolute inset-0 stars">
                <canvas
                    bind:this={starsCanvas}
                    class="absolute h-[calc(100dvh)] w-screen top-0 hidden dark:block"
                ></canvas>
            </div>
        </div>

        <div
            class="absolute h-[calc(100dvh+100px)] w-screen top-0 mountains"
        ></div>
    </div>
</div>

<div class="relative h-screen bg-base-300">
    <!-- horizontal paint brush stroke-->
    <svg
        version="1.1"
        viewBox="0 0 261.56 60.652"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute w-[calc(100%+200px)] auto text-base-300 -top-20 -left-[100px]"
    >
        <use href="/images/brush-stroke.svg#brush-stroke" />
    </svg>

    <div class="container relative prose">
        <h2>Recent blog postings</h2>
    </div>
</div>

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

        --bg-gradient-top: theme("colors.blue.400");
        --bg-gradient-bottom: theme("colors.blue.200");
        --gradient-angle: 175deg;
        --gradient-start: 10%;
        --gradient-end: 100%;

        background-image: linear-gradient(
            var(--gradient-angle),
            var(--bg-gradient-top) var(--gradient-start),
            var(--bg-gradient-bottom) var(--gradient-end)
        );
    }

    .stars {
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
        background: url("/images/mountains.png") no-repeat center center;
        background-size: cover;

        --initial-translate-y: 0px;
        --final-translate-y: -100px;
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
        }

        .mountains {
            background-image: url("/images/mountains-dark.png");
        }
    }
</style>
