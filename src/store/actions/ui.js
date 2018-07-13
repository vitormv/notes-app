export const UI_LOADED = 'UI_LOADED';
export const uiLoadedAction = isLoaded => ({
    type: UI_LOADED,
    isLoading: !isLoaded,
});

export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
export const updateSearchQueryAction = searchQuery => ({
    type: UPDATE_SEARCH_QUERY,
    searchQuery,
});
