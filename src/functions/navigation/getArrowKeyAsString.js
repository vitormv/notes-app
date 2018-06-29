export const getArrowKeyAsString = (keyCode) => {
    switch (keyCode) {
        case 37:
            return 'left';
        case 38:
            return 'up';
        case 39:
            return 'right';
        case 40:
            return 'down';
        default:
            return false;
    }
};
