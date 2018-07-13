import { connect } from 'react-redux';
import { SearchBox as SearchBoxPresentation } from 'src/components/list/SearchBox';
import { updateSearchQueryAction } from 'src/store/actions';
import { getSearchQuerySelector } from 'src/store/selectors';

const SearchBoxPure = SearchBoxPresentation;

const mapStateToProps = state => ({
    searchQuery: getSearchQuerySelector(state),
});

const mapDispatchToProps = {
    onInputChange: updateSearchQueryAction,
};

export const SearchBox = connect(mapStateToProps, mapDispatchToProps)(SearchBoxPure);
