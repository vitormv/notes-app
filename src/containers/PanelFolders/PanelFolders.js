import React from 'react';
import PropTypes from 'prop-types';
import { FolderCollectionType } from 'src/models/Folder';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FolderList } from 'src/components/folders/FolderList';
import { KeyboardNavigation } from 'src/containers/KeyboardNavigation';
import { collapseFolder, navigationSelectFolderAction } from 'src/store/actions';
import { addFolderAction } from 'src/store/actions/folders';
import {
    getSidebarFoldersSelector,
    highlightedFolderUidSelector,
    unhighlightedFolderSelector,
} from 'src/store/selectors';

const DraggableArea = styled.div`
    height: 3.2rem;
    -webkit-app-region: drag;
`;

export const PanelFoldersPure = ({
    folders,
    highlightedFolder,
    onClick,
    onCollapseFolder,
    lastActiveFolder,
    addFolder,
}) => (
    <nav className="l-panel-menu">
        <DraggableArea />
        <KeyboardNavigation columnIndex={1}>
            <FolderList
                folders={folders}
                highlightedUid={highlightedFolder}
                lastActiveFolder={lastActiveFolder}
                onClick={onClick}
                onCollapseFolder={onCollapseFolder}
                addFolder={addFolder}
                hasAddButton
            />
        </KeyboardNavigation>
    </nav>
);

PanelFoldersPure.propTypes = {
    folders: FolderCollectionType.isRequired,
    highlightedFolder: PropTypes.string,
    lastActiveFolder: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onCollapseFolder: PropTypes.func.isRequired,
    addFolder: PropTypes.func.isRequired,
};


PanelFoldersPure.defaultProps = {
    lastActiveFolder: null,
    highlightedFolder: null,
};

const mapStateToProps = state => ({
    folders: getSidebarFoldersSelector(state),
    highlightedFolder: highlightedFolderUidSelector(state),
    lastActiveFolder: unhighlightedFolderSelector(state),
});

const mapDispatchToProps = {
    onClick: navigationSelectFolderAction,
    onCollapseFolder: collapseFolder,
    addFolder: addFolderAction,
};

export const PanelFolders = connect(mapStateToProps, mapDispatchToProps)(PanelFoldersPure);
