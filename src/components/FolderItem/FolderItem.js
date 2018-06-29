import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { shouldUpdate } from 'recompose';
import isEqual from 'lodash/isEqual';
import { FolderList } from 'src/components/FolderList';

const FolderItemPure = ({
    folder,
    highlightedUid,
    lastActiveFolder,
    onSelectFolder,
    indent,
}) => (
    <li
        className={classNames({
            'o-notes-menu__item': true,
            'o-notes-menu__item--collapsed': folder.isCollapsed,
        })}
        key={folder.uid}
        onClick={(e) => { e.stopPropagation(); onSelectFolder(folder.uid); }}
        tabIndex={0}
    >
        <div
            className={classNames({
                'o-notes-menu__content': true,
                [`o-notes-menu__content--${folder.classSuffix}`]: Boolean(folder.classSuffix),
                'o-notes-menu__content--withChildren': folder.children.length > 0,
                'o-notes-menu__content--active': lastActiveFolder === folder.uid,
                'o-notes-menu__content--highlighted': highlightedUid === folder.uid,
            })}
            style={{ paddingLeft: `${((indent + 1) * 3.8)}rem` }}
        >
            <div className="o-notes-menu__icon">
                <i className={folder.iconClass} />
            </div>
            <div className="o-notes-menu__children-toggle">
                <i className="fas fa-angle-down" />
            </div>
            <div className="o-notes-menu__label" title={folder.label}>{folder.label}</div>
        </div>

        {
            folder.children.length > 0 &&
                <FolderList
                    folders={folder.children}
                    highlightedUid={highlightedUid}
                    lastActiveFolder={lastActiveFolder}
                    onSelectFolder={onSelectFolder}
                    indent={indent + 1}
                />
        }
    </li>
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
    onSelectFolder: PropTypes.func,
    highlightedUid: PropTypes.string,
    lastActiveFolder: PropTypes.string,
    indent: PropTypes.number,
};

FolderItemPure.defaultProps = {
    onSelectFolder: () => {},
    highlightedUid: null,
    lastActiveFolder: null,
    indent: 0,
};

export const FolderItem = shouldUpdate((props, nextProps) => (
    !isEqual(props, nextProps)
))(FolderItemPure);
