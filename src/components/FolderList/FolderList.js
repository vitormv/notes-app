import React from 'react';
import PropTypes from 'prop-types';
import { FolderItem } from 'src/components/FolderItem';

export const FolderList = ({
    folders,
    highlightedUid,
    lastActiveFolder,
    onSelectFolder,
    onCollapseFolder,
    hasAddButton,
    indent,
}) => (
    <ul className="o-notes-menu">
        {
            folders.map(folder => (
                <FolderItem
                    key={folder.uid}
                    indent={indent}
                    folder={folder}
                    onSelectFolder={onSelectFolder}
                    onCollapseFolder={onCollapseFolder}
                    lastActiveFolder={lastActiveFolder}
                    highlightedUid={highlightedUid}
                />
            ))
        }

        {
            hasAddButton &&
            <FolderItem
                folder={{
                    uid: 'folder:add_new',
                    label: 'add folder',
                    iconClass: 'fas fa-xs fa-plus',
                    classSuffix: 'smaller',
                    isCollapsed: false,
                    children: [],
                }}
                indent={indent}
            />
        }
    </ul>
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
    onSelectFolder: PropTypes.func.isRequired,
    onCollapseFolder: PropTypes.func.isRequired,
    hasAddButton: PropTypes.bool,
    indent: PropTypes.number,
};

FolderList.defaultProps = {
    hasAddButton: false,
    highlightedUid: null,
    lastActiveFolder: null,
    indent: 0,
};
