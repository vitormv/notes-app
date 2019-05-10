import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_UNDERLINE } from 'src/components/TextEditor/SlateDictionary';
import { Icon } from 'src/components/ui/Icon';
import styles from './HoverMenu.scss';

class HoverMenu extends React.PureComponent {
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
            <span
                className={classNames({
                    [styles.button]: true,
                    [styles.active]: isActive,
                })}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <Icon className={styles.icon} name={`${icon}`} />
            </span>
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
            <div
                className={classNames({
                    [className]: Boolean(className),
                    [styles.menu]: true,
                    [styles.isVisible]: isVisible,
                })}
                style={{
                    top: coordinates.top,
                    left: coordinates.left,
                }}
            >
                {this.renderMarkButton(MARK_BOLD, 'bold')}
                {this.renderMarkButton(MARK_ITALIC, 'italic')}
                {this.renderMarkButton(MARK_UNDERLINE, 'underline')}
                {this.renderMarkButton(MARK_CODE, 'code')}
            </div>,
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
