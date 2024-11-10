import {THEME_DARK, ThemeStore} from "$lib/client/stores/ThemeStore.svelte";
import {clamp, throttle} from "$lib/utils";

const STARS_COUNT = 5000;
const STAR_MIN_BRIGHTNESS = 0.3;
const STAR_MAX_BRIGHTNESS = 1;
const STAR_MIN_RADIUS = 0.2;
const STAR_MAX_RADIUS = 1;

export function initStars(canvas: HTMLCanvasElement) {
    // paint stars in dark mode
    $effect(() => {
        if (
            !canvas
            || ThemeStore.theme !== THEME_DARK
        ) {
            return;
        }

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        // Set canvas dimensions to match window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

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
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const stars = generateStars(STARS_COUNT);
            cancelAnimationFrame(animationFrame);
            twinklingStars(stars);
        };

        const handleResizeThrottled = throttle(handleResize, 100);

        // Handle window resize to redraw stars
        window.addEventListener("resize", handleResizeThrottled);

        return () => {
            window.removeEventListener("resize", handleResizeThrottled);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationFrame);
        };
    });
}