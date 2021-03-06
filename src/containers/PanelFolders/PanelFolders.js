import React from 'react';
import PropTypes from 'prop-types';
import { FolderCollectionType } from 'src/models/Folder';
import { connect } from 'react-redux';
import { FolderList } from 'src/components/folders/FolderList';
import { KeyboardNavigation } from 'src/containers/KeyboardNavigation';
import { collapseFolderAction, navigationSelectFolderAction } from 'src/store/actions';
import { addFolderAction, deleteFolderNodeAction, renameFolderAction } from 'src/store/actions/folders';
import {
    getSidebarFoldersSelector,
    highlightedFolderUidSelector,
    unhighlightedFolderSelector,
} from 'src/store/selectors';
import styles from './PanelFolders.scss';

export const PanelFoldersPure = ({
    folders,
    highlightedFolder,
    onClick,
    onCollapseFolder,
    onDeleteFolder,
    onRenameFolder,
    unhighlightedUid,
    addFolder,
}) => (
    <nav className={styles.foldersPanel}>
        <div className={styles.draggable} />
        <KeyboardNavigation columnIndex={1}>
            <FolderList
                folders={folders}
                highlightedUid={highlightedFolder}
                unhighlightedUid={unhighlightedUid}
                onClick={onClick}
                onCollapseFolder={onCollapseFolder}
                onDeleteFolder={onDeleteFolder}
                onRenameFolder={onRenameFolder}
                addFolder={addFolder}
                hasAddButton
            />
        </KeyboardNavigation>
    </nav>
);

PanelFoldersPure.propTypes = {
    folders: FolderCollectionType.isRequired,
    highlightedFolder: PropTypes.string,
    unhighlightedUid: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onCollapseFolder: PropTypes.func.isRequired,
    onDeleteFolder: PropTypes.func.isRequired,
    onRenameFolder: PropTypes.func.isRequired,
    addFolder: PropTypes.func.isRequired,
};


PanelFoldersPure.defaultProps = {
    unhighlightedUid: null,
    highlightedFolder: null,
};

const mapStateToProps = state => ({
    folders: getSidebarFoldersSelector(state),
    highlightedFolder: highlightedFolderUidSelector(state),
    unhighlightedUid: unhighlightedFolderSelector(state),
});

const mapDispatchToProps = {
    onClick: navigationSelectFolderAction,
    onCollapseFolder: collapseFolderAction,
    addFolder: addFolderAction,
    onDeleteFolder: deleteFolderNodeAction,
    onRenameFolder: renameFolderAction,
};

export const PanelFolders = connect(mapStateToProps, mapDispatchToProps)(PanelFoldersPure);
