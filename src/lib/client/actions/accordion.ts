export function accordion(node: HTMLElement, isOpen: boolean) {
    node.style.height = 'auto';
    let initialHeight = node.offsetHeight;
    node.style.height = isOpen ? 'auto' : '0';
    node.style.overflow = "hidden";

    return {
        update(isOpen: boolean) {
            let animation = node.animate(
                [
                    {
                        height: initialHeight + 'px',
                        overflow: 'hidden',
                    },
                    {
                        height: '0',
                        overflow: 'hidden',
                    }
                ],
                {
                    duration: 200,
                    fill: 'both',
                    easing: 'ease-in-out',
                },
            );

            animation.pause();

            if (!isOpen) {
                animation.play();
            } else {
                animation.reverse();
            }
        }
    };
}