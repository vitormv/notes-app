import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { shouldUpdate } from 'recompose';
import isEqual from 'lodash/isEqual';
import { FolderList } from 'src/components/folders/FolderList';
import { FolderItemLabel } from 'src/components/folders/FolderItemLabel';
import { animated, Spring } from 'react-spring';

export const folderItemHeight = 28;

const calculateItemHeight = (folder) => {
    let height = folderItemHeight;

    if (!folder.isCollapsed) {
        folder.children.forEach((child) => {
            height += calculateItemHeight(child);
        });
    }

    return height;
};

const FolderItemPure = ({
    folder,
    className,
    highlightedUid,
    lastActiveFolder,
    onClick,
    onCollapseFolder,
    indent,
}) => (
    <Spring
        config={{ tension: 210, friction: 24 }}
        native
        to={{
            height: `${calculateItemHeight(folder) / 10}rem`,
        }}
    >
        {styles => (
            <animated.li
                className={classNames({
                    'o-notes-menu__item': true,
                    'o-notes-menu__item--collapsed': folder.isCollapsed,
                    [className]: true,
                })}
                key={folder.uid}
                onClick={(e) => { e.stopPropagation(); onClick(folder.uid); }}
                tabIndex={0}
                style={styles}
            >
                <FolderItemLabel
                    label={folder.label}
                    icon={folder.iconClass}
                    indent={indent}
                    hasChildren={folder.children.length > 0}
                    isUnhighlighted={lastActiveFolder === folder.uid}
                    isHighlighted={highlightedUid === folder.uid}
                    isCollapsed={folder.isCollapsed}
                    onCollapseFolder={(e) => {
                        e.stopPropagation();
                        onCollapseFolder(folder.uid, !folder.isCollapsed);
                    }}
                />

                {folder.children.length > 0 && (
                    <Spring
                        config={{ tension: 210, friction: 24 }}
                        native
                        to={{
                            transform: folder.isCollapsed ? 'top-100%)' : 'translateY(0%)',
                            opacity: folder.isCollapsed ? '0' : '1',
                        }}
                    >
                        {subStyles => (
                            <FolderList
                                style={subStyles}
                                isCollapsed={folder.isCollapsed}
                                folders={folder.children}
                                highlightedUid={highlightedUid}
                                lastActiveFolder={lastActiveFolder}
                                onClick={onClick}
                                onCollapseFolder={onCollapseFolder}
                                indent={indent + 1}
                            />
                        )}
                    </Spring>
                )}
            </animated.li>
        )}
    </Spring>
);

FolderItemPure.propTypes = {
    folder: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        iconClass: PropTypes.string.isRequired,
        classSuffix: PropTypes.string,
        isCollapsed: PropTypes.bool.isRequired,
        children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        indent: PropTypes.number,
    }).isRequired,
    onClick: PropTypes.func,
    onCollapseFolder: PropTypes.func,
    highlightedUid: PropTypes.string,
    lastActiveFolder: PropTypes.string,
    className: PropTypes.string,
    indent: PropTypes.number,
};

FolderItemPure.defaultProps = {
    onClick: () => {},
    onCollapseFolder: () => {},
    highlightedUid: null,
    lastActiveFolder: null,
    className: '',
    indent: 0,
};

export const FolderItem = shouldUpdate((props, nextProps) => (
    !isEqual(props, nextProps)
))(FolderItemPure);
