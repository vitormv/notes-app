export const ensureElementIsInView = (container, element) => {
    // Determine container top and bottom
    const cTop = container.scrollTop + container.offsetTop;
    const cBottom = cTop + container.clientHeight;

    // Determine element top and bottom
    const eTop = element.offsetTop;
    const eBottom = eTop + element.clientHeight;

    // console.log(container, element);

    // Check if out of view
    if (eTop < cTop) {
        container.scrollTop -= (cTop - eTop);
    } else if (eBottom > cBottom) {
        container.scrollTop += (eBottom - cBottom);
    }
};
