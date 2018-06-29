import { createSelector } from 'reselect';
import { buildFolderTree, getFlattenedFolderNodes } from 'src/functions/navigation';
import { getSidebarFoldersSelector } from 'src/store/selectors/notes';

export const highlightedItemSelector = state => state.notes.navigation.highlighted;
export const lastActiveFolderSelector = state => state.notes.navigation.selected.folder;
export const lastActiveNoteSelector = state => state.notes.navigation.selected.note;

export const folderTreeSelector = createSelector(
    getSidebarFoldersSelector,
    (...args) => (buildFolderTree(...args)),
);

export const flattenedFolderNodesSelector = createSelector(
    folderTreeSelector,
    (...args) => (getFlattenedFolderNodes(...args)),
);
