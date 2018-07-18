import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FolderList } from 'src/components/folders/FolderList';
import { KeyboardNavigation } from 'src/containers/KeyboardNavigation';
import { collapseFolder, navigationSelectFolderAction } from 'src/store/actions';
import { addFolderAction } from 'src/store/actions/folders';
import {
    getSidebarFoldersSelector,
    highlightedItemSelector,
    lastActiveFolderSelector,
} from 'src/store/selectors';

const DraggableArea = styled.div`
    height: 3.2rem;
    -webkit-app-region: drag;
`;

export const PanelFoldersPure = ({
    folders,
    highlighted,
    onClick,
    onCollapseFolder,
    lastActiveFolder,
    addFolder,
}) => (
    <nav className="l-panel-menu">
        <DraggableArea />
        <KeyboardNavigation>
            <FolderList
                folders={folders}
                highlightedUid={highlighted.itemUid}
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
    folders: PropTypes.arrayOf(PropTypes.shape({
        uid: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        iconClass: PropTypes.string.isRequired,
        classSuffix: PropTypes.string,
        isCollapsed: PropTypes.bool.isRequired,
        children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        indent: PropTypes.number,
    })).isRequired,
    highlighted: PropTypes.shape({
        column: PropTypes.number.isRequired,
        itemUid: PropTypes.string,
    }).isRequired,
    lastActiveFolder: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onCollapseFolder: PropTypes.func.isRequired,
    addFolder: PropTypes.func.isRequired,
};


PanelFoldersPure.defaultProps = {
    lastActiveFolder: null,
};

const mapStateToProps = state => ({
    folders: getSidebarFoldersSelector(state),
    highlighted: highlightedItemSelector(state),
    lastActiveFolder: lastActiveFolderSelector(state),
});

const mapDispatchToProps = {
    onClick: navigationSelectFolderAction,
    onCollapseFolder: collapseFolder,
    addFolder: addFolderAction,
};

export const PanelFolders = connect(mapStateToProps, mapDispatchToProps)(PanelFoldersPure);
