export function clamp(min: number, value: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function throttle(callback: () => void, delay: number) {
    let previousCall = new Date().getTime();
    return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
            previousCall = time;
            callback();
        }
    };
}