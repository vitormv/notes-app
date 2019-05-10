import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FolderItem } from 'src/components/folders/FolderItem';
import { AddFolder } from 'src/components/folders/AddFolder';
import { animated } from 'react-spring';
import { FolderCollectionType } from 'src/models/Folder';
import styles from './FolderList.scss';

const FolderList = ({
    folders,
    highlightedUid,
    unhighlightedUid,
    onClick,
    onCollapseFolder,
    indent,
    addFolder,
    style,
    onDeleteFolder,
    onRenameFolder,
}) => (
    <animated.ul
        className={classNames({
            [styles.menu]: true,
            [styles.mainMenu]: indent === 0,
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
                    onDeleteFolder={onDeleteFolder}
                    onRenameFolder={onRenameFolder}
                />
            ))
        }

        {indent === 0 && (
            <AddFolder
                addFolderCallback={addFolder}
            />
        )}
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
    onDeleteFolder: PropTypes.func.isRequired,
    onRenameFolder: PropTypes.func.isRequired,
};

FolderList.defaultProps = {
    addFolder: null,
    highlightedUid: null,
    unhighlightedUid: null,
    indent: 0,
    style: {},
};

export { FolderList };
