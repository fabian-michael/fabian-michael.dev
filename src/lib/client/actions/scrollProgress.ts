type ScrollOffset = `${string} ${string}`;
type OffsetValue = number | string;

const parseOffsetValue = (value: string, containerSize: number): number => {
    // Handle named values
    if (value === "start") return 0;
    if (value === "center") return 0.5;
    if (value === "end") return 1;

    // Handle percentage values
    if (value.endsWith("%")) {
        return parseFloat(value) / 100;
    }

    // Handle pixel values
    if (value.endsWith("px")) {
        return parseFloat(value) / containerSize;
    }

    // Handle viewport units
    if (value.endsWith("vh")) {
        return (parseFloat(value) * window.innerHeight) / containerSize;
    }
    if (value.endsWith("vw")) {
        return (parseFloat(value) * window.innerWidth) / containerSize;
    }

    // Handle raw numbers
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
};

const parseOffset = (offset: ScrollOffset): [OffsetValue, OffsetValue] => {
    const [target, container] = offset.split(" ");
    return [target, container];
};

type Params = {
    container?: Node | Window;
    offset?: [ScrollOffset, ScrollOffset];
    axis?: "x" | "y";
    onChange: (progress: number, element: HTMLElement) => void;
};

export const scrollProgress = (
    target: HTMLElement,
    params: Params = {
        offset: ["start start", "end end"],
        axis: "y",
        onChange: () => {
        },
    },
) => {
    const container = params.container || window;
    const axis = params.axis || "y";
    const offset = params.offset || ["start start", "end end"];

    const getProgress = () => {
        const {
            top,
            height,
            left,
            width,
        } = target.getBoundingClientRect();

        if (container === window) {
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const scrollY = window.scrollY;
            const scrollX = window.scrollX;

            if (axis === "y") {
                // Parse offsets
                const [startTarget, startContainer] = parseOffset(offset[0]);
                const [endTarget, endContainer] = parseOffset(offset[1]);

                // Convert to actual positions
                const startTargetPos = top + scrollY + parseOffsetValue(startTarget as string, height) * height;
                const endTargetPos = top + scrollY + parseOffsetValue(endTarget as string, height) * height;
                const startContainerPos = parseOffsetValue(startContainer as string, viewportHeight) * viewportHeight;
                const endContainerPos = parseOffsetValue(endContainer as string, viewportHeight) * viewportHeight;

                // Calculate start and end scroll positions
                const startScrollPos = startTargetPos - startContainerPos;
                const endScrollPos = endTargetPos - endContainerPos;

                // Calculate progress
                return Math.max(0, Math.min(1, (scrollY - startScrollPos) / (endScrollPos - startScrollPos)));
            } else {
                // Parse offsets
                const [startTarget, startContainer] = parseOffset(offset[0]);
                const [endTarget, endContainer] = parseOffset(offset[1]);

                // Convert to actual positions
                const startTargetPos = left + scrollX + parseOffsetValue(startTarget as string, width) * width;
                const endTargetPos = left + scrollX + parseOffsetValue(endTarget as string, width) * width;
                const startContainerPos = parseOffsetValue(startContainer as string, viewportWidth) * viewportWidth;
                const endContainerPos = parseOffsetValue(endContainer as string, viewportWidth) * viewportWidth;

                // Calculate start and end scroll positions
                const startScrollPos = startTargetPos - startContainerPos;
                const endScrollPos = endTargetPos - endContainerPos;

                // Calculate progress
                return Math.max(0, Math.min(1, (scrollX - startScrollPos) / (endScrollPos - startScrollPos)));
            }
        } else {
            // Similar logic for custom container...
            const containerRect = (container as Element).getBoundingClientRect();
            const containerScroll = axis === "y"
                ? (container as Element).scrollTop
                : (container as Element).scrollLeft;

            if (axis === "y") {
                const [startTarget, startContainer] = parseOffset(offset[0]);
                const [endTarget, endContainer] = parseOffset(offset[1]);

                const startTargetPos = (top - containerRect.top) +
                    parseOffsetValue(startTarget as string, height) * height;
                const endTargetPos = (top - containerRect.top) +
                    parseOffsetValue(endTarget as string, height) * height;
                const startContainerPos = parseOffsetValue(startContainer as string, containerRect.height) *
                    containerRect.height;
                const endContainerPos = parseOffsetValue(endContainer as string, containerRect.height) *
                    containerRect.height;

                const startScrollPos = startTargetPos - startContainerPos;
                const endScrollPos = endTargetPos - endContainerPos;

                return Math.max(0, Math.min(1, (containerScroll - startScrollPos) / (endScrollPos - startScrollPos)));
            } else {
                // X-axis logic for custom container...
                const [startTarget, startContainer] = parseOffset(offset[0]);
                const [endTarget, endContainer] = parseOffset(offset[1]);

                const startTargetPos = (left - containerRect.left) +
                    parseOffsetValue(startTarget as string, width) * width;
                const endTargetPos = (left - containerRect.left) +
                    parseOffsetValue(endTarget as string, width) * width;
                const startContainerPos = parseOffsetValue(startContainer as string, containerRect.width) *
                    containerRect.width;
                const endContainerPos = parseOffsetValue(endContainer as string, containerRect.width) *
                    containerRect.width;

                const startScrollPos = startTargetPos - startContainerPos;
                const endScrollPos = endTargetPos - endContainerPos;

                return Math.max(0, Math.min(1, (containerScroll - startScrollPos) / (endScrollPos - startScrollPos)));
            }
        }
    };

    const handleScroll = () => {
        const progress = getProgress();
        params.onChange(progress, target);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Initial call
    handleScroll();

    return {
        destroy: () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        },
        update: (newParams: Params) => {
            Object.assign(params, newParams);
            handleScroll();
        },
    };
};