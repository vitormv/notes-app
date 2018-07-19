import { createSelector } from 'reselect';
import {
    buildFolderStructure, buildFolderTree,
    buildSidebarFolderList, getFlattenedFolderNodes,
} from 'src/functions/navigation';
import { lastActiveFolderSelector } from 'src/store/selectors/navigation';

export const allNotesSelector = state => state.notes.notes;
export const userFoldersSelector = state => state.notes.folders;

export const allNotesUids = createSelector(
    allNotesSelector,
    allNotes => Object.keys(allNotes),
);

export const folderStructureSelector = createSelector(
    userFoldersSelector,
    buildFolderStructure,
);

export const getSidebarFoldersSelector = createSelector(
    folderStructureSelector,
    (...args) => (buildSidebarFolderList(...args)),
);

export const folderTreeSelector = createSelector(
    getSidebarFoldersSelector,
    (...args) => (buildFolderTree(...args)),
);

export const flattenedFolderNodesSelector = createSelector(
    folderTreeSelector,
    (...args) => (getFlattenedFolderNodes(...args)),
);

export const currentNotesUidsSelector = createSelector(
    allNotesSelector,
    lastActiveFolderSelector,
    (allNotes, lastActiveFolder) => {
        const folderUid = lastActiveFolder || 'folder:notes';
        const allUids = Object.keys(allNotes);

        if (folderUid === 'folder:notes') return allUids;

        return allUids.filter(noteUid => allNotes[noteUid].folderUid === folderUid);
    },
);

export const currentNotesSelector = createSelector(
    currentNotesUidsSelector,
    allNotesSelector,
    (currentNotesUids, allNotes) => {
        currentNotesUids.map((uid) => {


            return (allNotes[uid]);
        });

        return (currentNotesUids.map(uid => (allNotes[uid])));
    },
);

