import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FolderItem } from 'src/components/FolderItem';
import { AddFolder } from 'src/components/folders/AddFolder';
import { animated } from 'react-spring';

const FolderList = ({
    folders,
    highlightedUid,
    lastActiveFolder,
    onClick,
    onCollapseFolder,
    indent,
    addFolder,
    style,
}) => (
    <animated.ul
        className={classNames({
            'o-notes-menu': true,
            'o-notes-menu--main': indent === 0,
        })}
        style={style}
    >
        {
            folders.map(folder => (
                <FolderItem
                    key={folder.uid}
                    indent={indent}
                    folder={folder}
                    onClick={onClick}
                    onCollapseFolder={onCollapseFolder}
                    lastActiveFolder={lastActiveFolder}
                    highlightedUid={highlightedUid}
                />
            ))
        }

        <AddFolder
            addFolderCallback={addFolder}
            indent={indent}
            hasAddButton={indent === 0}
        />
    </animated.ul>
);

FolderList.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        uid: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        iconClass: PropTypes.string.isRequired,
        classSuffix: PropTypes.string,
        isCollapsed: PropTypes.bool.isRequired,
        children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        indent: PropTypes.number,
    })).isRequired,
    highlightedUid: PropTypes.string,
    lastActiveFolder: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onCollapseFolder: PropTypes.func.isRequired,
    indent: PropTypes.number,
    addFolder: PropTypes.func,
    style: PropTypes.shape({}),
};

FolderList.defaultProps = {
    addFolder: null,
    highlightedUid: null,
    lastActiveFolder: null,
    indent: 0,
    style: {},
};

export { FolderList };
