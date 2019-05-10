import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Show } from 'src/components/ui/Show';

import styles from './FolderItemLabel.scss';

const FolderItemLabel = ({
    label,
    icon,
    indent,
    isHighlighted,
    isUnhighlighted,
    hasChildren,
    isCollapsed,
    onCollapseFolder,
    onClick,
    style,
}) => (
    <animated.div
        className={classNames({
            [styles.folderItem]: true,
            [styles.highlighted]: isHighlighted,
            [styles.lightlyHighlighted]: isUnhighlighted,
        })}
        style={{
            ...style,
            paddingLeft: `${((indent + 1) * 2)}rem`,
        }}
        onClick={onClick}
    >
        <div className={styles.icons}>
            <FontAwesomeIcon icon={icon} />

            <Show when={hasChildren}>
                <div
                    className={classNames({
                        [styles.collapseToggle]: true,
                        [styles.collapsed]: isCollapsed,
                        [styles.hasChildren]: hasChildren,
                    })}
                    onClick={onCollapseFolder}
                >
                    <FontAwesomeIcon icon="angle-down" />
                </div>
            </Show>
        </div>

        <div className={styles.label} title={label}>{label}</div>
    </animated.div>
);

FolderItemLabel.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    hasChildren: PropTypes.bool,
    isHighlighted: PropTypes.bool,
    isUnhighlighted: PropTypes.bool,
    isCollapsed: PropTypes.bool,
    onCollapseFolder: PropTypes.func,
    indent: PropTypes.number,
    onClick: PropTypes.func,
    style: PropTypes.shape({}),
};

FolderItemLabel.defaultProps = {
    indent: 0,
    hasChildren: false,
    isHighlighted: false,
    isUnhighlighted: false,
    isCollapsed: false,
    onCollapseFolder: () => {},
    onClick: () => {},
    style: {},
};

export { FolderItemLabel };
