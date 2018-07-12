import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_UNDERLINE } from 'src/components/TextEditor/SlateDictionary';
import styled from 'styled-components';

const StyledMenu = styled('div')`
  padding: 0.8rem 0.7rem 0.6rem;
  position: absolute;
  z-index: 1;
  margin-top: -0.6px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  background-color: ${props => props.theme.reversed.background};
  border-radius: 0.4rem;
  transition: opacity 200ms ${props => props.theme.animation.fast},
              transform 150ms ${props => props.theme.animation.fast};
  transform: translateX(-50%)
             translateY(${props => (props.isVisible ? '-110%' : '-90%')})
             scale(${props => (props.isVisible ? 1 : 0.95)});
  
  & > * {
    display: inline-block;
  }
`;

export const Button = styled('span')`
  cursor: pointer;
  color: ${props => (props.active ? props.theme.primary : props.theme.text)};
`;

export const Icon = styled(({ name, className, ...rest }) => <span className={`icon-${name} ${className}`} {...rest} />)`
  font-size: 16px;
  display: inline-block;
  padding: .5rem 0.8rem;
  vertical-align: text-bottom;
  color: ${props => props.theme.textLight};
  
  &:hover {
    color: ${props => props.theme.textHover};
  }
`;

class HoverMenu extends React.Component {
    onClickMark(event, type) {
        event.preventDefault();

        const { value, onChange } = this.props;
        const change = value.change().toggleMark(type);

        onChange(change);
    }

    renderMarkButton(type, icon) {
        const { value } = this.props;
        const isActive = value.activeMarks.some(mark => mark.type === type);

        return (
            <Button
                reversed
                active={isActive}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <Icon name={`${icon}`} />
            </Button>
        );
    }

    render() {
        const { className, isVisible } = this.props;
        const root = window.document.getElementById('js-notes-app');

        const coordinates = { top: 0, left: 0 };

        if (isVisible) {
            const range = window.getSelection().getRangeAt(0);
            const rect = range.getBoundingClientRect();

            coordinates.top = `${rect.top}px`;
            coordinates.left = `${(rect.left + (rect.width / 2))}px`;
        }

        return ReactDOM.createPortal(
            <StyledMenu
                className={className}
                isVisible={isVisible}
                style={{
                    top: coordinates.top,
                    left: coordinates.left,
                }}
            >
                {this.renderMarkButton(MARK_BOLD, 'bold')}
                {this.renderMarkButton(MARK_ITALIC, 'italic')}
                {this.renderMarkButton(MARK_UNDERLINE, 'underline')}
                {this.renderMarkButton(MARK_CODE, 'code')}
            </StyledMenu>,
            root,
        );
    }
}

HoverMenu.propTypes = {
    value: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    isVisible: PropTypes.bool,
};

HoverMenu.defaultProps = {
    className: '',
    isVisible: false,
};

export { HoverMenu };
