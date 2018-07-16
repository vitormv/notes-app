import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'src/components/ui/Icon';
import styled from 'styled-components';

const SearchBoxStyled = styled.div`
    position: relative;
    width: 20rem;
    overflow-x: hidden;
    cursor: text;
    background-color: ${props => props.theme.background};
    border: 1px solid ${({ isFocused, theme }) => (isFocused ? theme.textLight : theme.gray.medium)};
    border-radius: 4px;
    padding: 0.6rem 1rem;
    box-sizing: border-box;
    font-size: 1.6rem;
    color: ${({ hasSearchQuery, theme }) => (hasSearchQuery ? theme.text : theme.textLight)};
    transition: color 150ms linear;
    
    strong {
        display: inline-block;
        position: relative; 
    }
`;

const StyledRemove = styled(Icon)`
  z-index: 1;
  position: absolute;
  cursor: pointer;
  right: .8rem;
  top: 50%;
  font-size: 1.8rem;
  background-color: white;
  color: ${props => (props.isFocused ? props.theme.text : props.theme.textLight)};
  transform: translateY(-50%);
  
  opacity: ${props => ((props.hasSearchQuery) ? '1' : '0')};
  transition: opacity 200ms ${props => props.theme.animation.fast};
  display: ${props => (props.hasSearchQuery ? 'block' : 'none')} !important;

  &:hover {
      color: ${props => props.theme.primary};
  }
`;

const StyledIcon = styled(Icon)`
    position: absolute;
    left: 0;
    top: 1px;
    color: ${props => (props.isFocused ? props.theme.text : props.theme.textLight)};
`;

const ShiftedSpan = styled.span`
    transform: translateX(${props => ((props.isFocused || props.hasSearchQuery) ? '0%' : '50%')});
    display: inline-block;
    cursor: text;
    width: 100%;
    box-sizing: border-box;
    transition: transform 200ms ${props => props.theme.animation.fast};
`;

const ShiftedSpan2 = styled.span`
    padding-left: 2.5rem;
    transform: translateX(${props => ((props.isFocused || props.hasSearchQuery) ? '0%' : '-50%')});
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    cursor: text;
    height: 1.4rem;
    transition: transform 200ms ${props => props.theme.animation.fast};
`;

const StyledSearchInput = styled.input`
    background-color: transparent;
    position: absolute;
    left: 0;
    top: 0.2rem;
    width: ${props => ((props.isFocused || props.hasSearchQuery) ? `calc(${props.width}px - 6.5rem)` : '100%')};
    outline: none;
    box-sizing: border-box;
    margin-left: 2.5rem;
    border: none;
    font-size: 1.4rem;
    color: ${props => props.theme.text};
`;

class SearchBox extends React.PureComponent {
    constructor(props) {
        super(props);

        this.width = 0;
        this.inputNode = null;
        this.containerNode = null;
        this.state = { isFocused: false };
    }

    componentDidMount() {
        this.recalculateContainerWidth();
    }

    componentDidUpdate() {
        this.recalculateContainerWidth();
    }

    onClickErase(event) {
        this.props.onInputChange('');
        this.toggleInputFocus(false);

        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    toggleInputFocus(isFocused) {
        if (this.inputNode) {
            this.setState({ isFocused });

            if (isFocused) {
                this.inputNode.focus();
            } else {
                this.inputNode.blur();
            }
        }
    }

    recalculateContainerWidth() {
        this.width = Math.floor(this.containerNode.getBoundingClientRect().width);
    }

    render() {
        const { searchQuery, onInputChange } = this.props;
        const { isFocused } = this.state;
        const hasSearchQuery = searchQuery.length > 0;

        return (
            <SearchBoxStyled
                hasSearchQuery={hasSearchQuery}
                innerRef={(el) => { this.containerNode = el; }}
                isFocused={isFocused}
                onClick={() => { this.toggleInputFocus(true); }}
            >
                <ShiftedSpan isFocused={isFocused} hasSearchQuery={hasSearchQuery}>
                    <ShiftedSpan2 isFocused={isFocused} hasSearchQuery={hasSearchQuery}>
                        <StyledIcon name="search" isFocused={isFocused} />
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
                            onBlur={() => { this.toggleInputFocus(false); }}
                            onFocus={() => { this.toggleInputFocus(true); }}
                        />
                    </ShiftedSpan2>
                </ShiftedSpan>
                <StyledRemove
                    name="times-circle"
                    isFocused={isFocused}
                    hasSearchQuery={hasSearchQuery}
                    onClick={(e) => { this.onClickErase(e); }}
                />
            </SearchBoxStyled>
        );
    }
}

SearchBox.propTypes = {
    searchQuery: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
    searchQuery: 'Search',
};

export { SearchBox };
