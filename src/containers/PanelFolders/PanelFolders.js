import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FolderList } from 'src/components/FolderList';
import { KeyboardNavigation } from 'src/containers/KeyboardNavigation';
import { navigationSelectFolderAction } from 'src/store/actions';
import {
    getSidebarFoldersSelector,
    highlightedItemSelector,
    lastActiveFolderSelector,
} from 'src/store/selectors';

export const PanelFoldersPure = ({
    folders,
    highlighted,
    onSelectFolder,
    lastActiveFolder,
}) => (
    <nav className="l-panel-menu">
        <KeyboardNavigation>
            <FolderList
                folders={folders}
                highlightedUid={highlighted.itemUid}
                lastActiveFolder={lastActiveFolder}
                onSelectFolder={onSelectFolder}
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
    onSelectFolder: PropTypes.func.isRequired,
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
    onSelectFolder: navigationSelectFolderAction,
};

export const PanelFolders = connect(mapStateToProps, mapDispatchToProps)(PanelFoldersPure);
