import { UI_LOADED, UPDATE_SEARCH_QUERY } from 'src/store/actions';

const defaultState = {
    isLoading: true,
    searchQuery: '',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case UI_LOADED: {
            return {
                ...state,
                isLoading: action.isLoading,
            };
        }

        case UPDATE_SEARCH_QUERY: {
            return {
                ...state,
                searchQuery: action.searchQuery,
            };
        }

        default:
            return state;
    }
};
