const styledTheme = {
    primary: '#DC5542',
    text: '#707070',
    textLight: '#B7B7B7',
    textHover: '#fff',
    background: '#fff',
    reversed: {
        background: '#292D36',
        backgroundLight: '#3c4048',
        text: '#FBFBFB',
        unhighlighted: '#4c4e53',
    },
    gray: {
        darkest: '#E3E3E3',
        medium: '#F0F0F0',
        light: '#FBFBFB',
    },
    animation: {
        fast: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        slow: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
    },
};

styledTheme.ui = {
    folder: {
        default: {
            color: styledTheme.gray.medium,
            background: styledTheme.reversed.background,
        },
        highlighted: {
            color: styledTheme.textHover,
            background: styledTheme.primary,
        },
        unhighlighted: {
            color: styledTheme.textHover,
            background: styledTheme.reversed.unhighlighted,
        },
    },
};

export { styledTheme };
