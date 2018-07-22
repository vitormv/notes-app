import { createSelector } from 'reselect';
import {
    buildFolderStructure, buildFolderTree,
    buildSidebarFolderList, getFlattenedFolderNodes, getHighlightedNote, getNextHighlightedNote,
} from 'src/functions/navigation';
import { getStringHash } from 'src/functions/string/getStringHash';
import { highlightedItemSelector, lastActiveFolderSelector } from 'src/store/selectors/navigation';

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

export const getCurrentNoteUidsHashSelector = createSelector(
    currentNotesUidsSelector,
    noteUids => getStringHash(noteUids.join('.')),
);

export const highlightedFolderUidSelector = createSelector(
    highlightedItemSelector,
    highlightedItem => (highlightedItem.column === 1 ? highlightedItem.itemUid : null),
);

export const highlightedNoteUidSelector = createSelector(
    highlightedItemSelector,
    currentNotesUidsSelector,
    (...args) => getHighlightedNote(...args),
);

export const highlightedNoteSelector = createSelector(
    highlightedNoteUidSelector,
    allNotesSelector,
    (highlightedNoteUid, notes) => notes[highlightedNoteUid],
);

export const currentNotesSelector = createSelector(
    currentNotesUidsSelector,
    allNotesSelector,
    (currentNotesUids, allNotes) => (currentNotesUids.map(uid => (allNotes[uid]))),
);

