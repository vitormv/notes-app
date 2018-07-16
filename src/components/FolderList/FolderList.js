import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FolderItem } from 'src/components/FolderItem';
import styled from 'styled-components';

const StyledRename = styled.li`
    padding: 1rem 3rem;
    box-sizing: border-box;
    
    input {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid ${props => props.theme.reversed.text};
        color: ${props => props.theme.reversed.text};
        padding: 1rem 2rem 1rem 2rem;
        width: 100%;
        box-sizing: border-box;
        display: block;
        outline: none;
    }
`;

const FolderList = ({
    folders,
    highlightedUid,
    lastActiveFolder,
    onSelectFolder,
    onCollapseFolder,
    hasAddButton,
    indent,
}) => (
    <ul
        className={classNames({
            'o-notes-menu': true,
            'o-notes-menu--main': indent === 0,
        })}
    >
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

        {/*<StyledRename>*/}
            {/*<input placeholder="folder name" type="text" />*/}
        {/*</StyledRename>*/}

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

export { FolderList };
