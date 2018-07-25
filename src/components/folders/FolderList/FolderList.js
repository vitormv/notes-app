import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FolderItem } from 'src/components/folders/FolderItem';
import { AddFolder } from 'src/components/folders/AddFolder';
import { animated } from 'react-spring';
import { FolderCollectionType } from 'src/models/Folder';

const FolderList = ({
    folders,
    highlightedUid,
    unhighlightedUid,
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
                    highlightedUid={highlightedUid}
                    unhighlightedUid={unhighlightedUid}
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
    folders: FolderCollectionType.isRequired,
    highlightedUid: PropTypes.string,
    unhighlightedUid: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onCollapseFolder: PropTypes.func.isRequired,
    indent: PropTypes.number,
    addFolder: PropTypes.func,
    style: PropTypes.shape({}),
};

FolderList.defaultProps = {
    addFolder: null,
    highlightedUid: null,
    unhighlightedUid: null,
    indent: 0,
    style: {},
};

export { FolderList };
