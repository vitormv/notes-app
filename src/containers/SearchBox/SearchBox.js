import { connect } from 'react-redux';
import { SearchBox as SearchBoxPresentation } from 'src/components/list/SearchBox';
import { toggleSearchInputFocusAction, updateSearchQueryAction } from 'src/store/actions';
import { getSearchQuerySelector, isSearchInputFocusedSelector } from 'src/store/selectors';

const SearchBoxPure = SearchBoxPresentation;

const mapStateToProps = state => ({
    isFocused: isSearchInputFocusedSelector(state),
    searchQuery: getSearchQuerySelector(state),
});

const mapDispatchToProps = {
    toggleSearchBoxFocus: toggleSearchInputFocusAction,
    onInputChange: updateSearchQueryAction,
};

export const SearchBox = connect(mapStateToProps, mapDispatchToProps)(SearchBoxPure);
