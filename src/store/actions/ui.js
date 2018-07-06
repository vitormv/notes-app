export const UI_LOADED = 'UI_LOADED';
export const uiLoaded = isLoaded => ({
    type: UI_LOADED,
    isLoading: !isLoaded,
});
