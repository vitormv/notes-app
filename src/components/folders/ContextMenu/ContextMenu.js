import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './ContextMenu.scss';

class ContextMenu extends React.PureComponent {
    render() {
        const root = window.document.getElementById('js-notes-app');

        const coordinates = {};
        const rect = this.props.parentCoordinates;

        coordinates.top = `${this.props.mouse.y}px`;
        coordinates.left = `${(this.props.mouse.x + 5)}px`;

        const onOverlayClick = (event) => {
            event.stopPropagation();
            event.preventDefault();
            this.props.closeMenu();
        };

        return ReactDOM.createPortal(
            <div
                className={styles.overlay}
                onClick={onOverlayClick}
                onContextMenu={onOverlayClick}
            >
                <ul
                    className={styles.menu}
                    style={{
                        ...this.props.style,
                        top: coordinates.top,
                        left: coordinates.left,
                    }}
                >
                    <li onClick={this.props.onRename}>Rename</li>
                    <li onClick={this.props.onDelete}>Delete</li>
                </ul>
            </div>,
            root,
        );
    }
}

ContextMenu.propTypes = {
    style: PropTypes.shape({}),
    parentCoordinates: PropTypes.shape({}).isRequired,
    onDelete: PropTypes.func.isRequired,
    onRename: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
    mouse: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
};

ContextMenu.defaultProps = {
    style: {},
};

export { ContextMenu };
