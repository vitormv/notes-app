import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledMenu = styled('ul')`
  padding: 0;
  position: absolute;
  z-index: 1;
  margin-top: -0.6px;
  opacity: 1;
  background-color: ${props => props.theme.gray.medium};
  border: 1px solid ${props => props.theme.gray.darkest};
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.24);
  border-radius: 0.4rem;
  transform: translateY(-50%);
  font-size: 1.4rem;
  color: ${props => props.theme.text};
  overflow: hidden;

  > * {
    list-style-type: none;
    padding: 0.5rem 3rem;
    cursor: default;

    &:hover {
      background-color: ${props => props.theme.primary}
      color: ${props => props.theme.reversed.text};
    }
  }
`;

class ContextMenu extends React.PureComponent {
    render() {
        const root = window.document.getElementById('js-notes-app');

        const coordinates = {};
        const rect = this.props.parentCoordinates;

        coordinates.top = `${this.props.mouse.y}px`;
        coordinates.left = `${(this.props.mouse.x + 5)}px`;

        return ReactDOM.createPortal(
            <StyledMenu
                style={{
                    ...this.props.style,
                    top: coordinates.top,
                    left: coordinates.left,
                }}
            >
                <li>Rename</li>
                <li
                    onClick={() => { console.log('clickqued'); this.props.onDelete(); }}
                >
                    Delete
                </li>
            </StyledMenu>,
            root,
        );
    }
}

ContextMenu.propTypes = {
    style: PropTypes.shape({}),
    parentCoordinates: PropTypes.shape({}).isRequired,
    onDelete: PropTypes.func.isRequired,
    mouse: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
};

ContextMenu.defaultProps = {
    style: {},
}

export { ContextMenu };
