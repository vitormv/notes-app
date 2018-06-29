import { createSelector } from 'reselect';
import { buildFolderStructure, buildSidebarFolderList } from 'src/functions/navigation';

export const allNotesSelector = state => state.notes.notes;
export const currentNotesUidsSelector = state => state.notes.current;
export const userFoldersSelector = state => state.notes.folders;

export const folderStructureSelector = createSelector(
    userFoldersSelector,
    buildFolderStructure,
);

export const currentNotesSelector = createSelector(
    currentNotesUidsSelector,
    allNotesSelector,
    (currentNotesUids, allnotes) => (currentNotesUids.map(uid => (allnotes[uid]))),
);

export const getSidebarFoldersSelector = createSelector(
    folderStructureSelector,
    (...args) => (buildSidebarFolderList(...args)),
);
