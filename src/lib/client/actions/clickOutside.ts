export function clickOutside(node: Node, callback?: (event: MouseEvent) => void) {

    const handleClick = (event: MouseEvent) => {
        if (
            node &&
            event.target instanceof Node &&
            !node.contains(event.target) &&
            !event.defaultPrevented
        ) {
            callback?.(event);
        }
    };

    document.addEventListener('click', handleClick);

    return {
        destroy() {
            document.removeEventListener('click', handleClick);
        },
    };
}