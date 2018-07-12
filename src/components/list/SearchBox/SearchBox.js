import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'src/components/ui/Icon';
import styled from 'styled-components';

const SearchBoxStyled = styled.div`
    position: relative;
    width: 20rem;
    cursor: text;
    background-color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.gray.medium};
    border-radius: 4px;
    padding: 0.6rem 1rem;
    box-sizing: border-box;
    font-size: 1.6rem;
    color: ${props => (props.isFocused ? props.theme.text : props.theme.textLight)};
    transition: color 150ms linear;
    
    strong {
        display: inline-block;
        position: relative; 
    }
`;

const StyledIcon = styled(Icon)`
    position: absolute;
    left: 0;
    top: 1px;
`;

const ShiftedSpan = styled.span`
    transform: translateX(${props => ((props.isFocused || props.hasSearchQuery) ? '0%' : '50%')});
    display: inline-block;
    cursor: text;
    width: 100%;
    box-sizing: border-box;
    transition: transform 150ms ${props => props.theme.animation.fast};
`;

const ShiftedSpan2 = styled.span`
    padding-left: 2.5rem;
    transform: translateX(${props => ((props.isFocused || props.hasSearchQuery) ? '0%' : '-50%')});
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    cursor: text;
    height: 1.4rem;
    transition: transform 150ms ${props => props.theme.animation.fast};
`;

const StyledSearchInput = styled.input`
    background-color: transparent;
    position: absolute;
    left: 0;
    top: 0;
    width: ${props => ((props.isFocused || props.hasSearchQuery) ? `calc(${props.width}px - 4.5rem)` : '100%')};
    outline: none;
    box-sizing: border-box;
    margin-left: 2.5rem;
    border: none;
    font-size: 1.6rem;
    color: ${props => (props.isFocused ? props.theme.text : props.theme.textLight)};
`;

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.width = 0;
        this.inputNode = null;
        this.containerNode = null;
    }

    componentDidMount() {
        this.recalculateContainerWidth();
    }

    componentDidUpdate() {
        this.recalculateContainerWidth();
    }

    recalculateContainerWidth() {
        this.width = Math.floor(this.containerNode.getBoundingClientRect().width);
    }

    toggleInputFocus() {
        if (this.inputNode) {
            this.inputNode.focus();
        }
    }

    render() {
        const {
            isFocused, toggleSearchBoxFocus, searchQuery, onInputChange,
        } = this.props;

        const hasSearchQuery = searchQuery.length > 0;

        return (
            <SearchBoxStyled
                innerRef={(el) => { this.containerNode = el; }}
                isFocused={isFocused}
                onClick={() => { this.toggleInputFocus(); }}
            >
                <ShiftedSpan isFocused={isFocused} hasSearchQuery={hasSearchQuery}>
                    <ShiftedSpan2 isFocused={isFocused} hasSearchQuery={hasSearchQuery}>
                        <StyledIcon name="search" />
                        <span style={{ visibility: hasSearchQuery ? 'hidden' : 'visible' }}>
                            Search
                        </span>
                        <StyledSearchInput
                            innerRef={(el) => { this.inputNode = el; }}
                            value={searchQuery}
                            isFocused={isFocused}
                            hasSearchQuery={hasSearchQuery}
                            width={this.width}
                            onChange={(e) => { onInputChange(e.target.value); }}
                            onClick={(e) => { e.stopPropagation(); }}
                            onBlur={() => { toggleSearchBoxFocus(false); }}
                            onFocus={() => { toggleSearchBoxFocus(true); }}
                        />
                    </ShiftedSpan2>
                </ShiftedSpan>
            </SearchBoxStyled>
        );
    }
}

SearchBox.propTypes = {
    isFocused: PropTypes.bool,
    searchQuery: PropTypes.string,
    toggleSearchBoxFocus: PropTypes.func,
    onInputChange: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
    toggleSearchBoxFocus: () => {},
    isFocused: false,
    searchQuery: 'Search',
};

export { SearchBox };
