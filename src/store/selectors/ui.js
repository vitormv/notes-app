import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

export const isUiLoadingSelector = state => state.ui.isLoading;
export const getSearchQuerySelector = state => state.ui.searchQuery;

export const getSearchQueryWordsSelector = createSelector(
    getSearchQuerySelector,
    searchQuery => searchQuery.split(/(\s+)/).map(text => text.trim()).filter(word => !isEmpty(word)),
);
