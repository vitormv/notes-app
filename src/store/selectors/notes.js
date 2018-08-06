import { createSelector } from 'reselect';
import { buildFolderHierarchy } from 'src/functions/folders';
import { buildFolderTree, getFlattenedFolderNodes, getHighlightedNote } from 'src/functions/navigation';
import { getStringHash } from 'src/functions/string/getStringHash';
import intersection from 'lodash/intersection';
import { Search as JsSearch, UnorderedSearchIndex } from 'js-search';
import {
    highlightedItemSelector,
    unhighlightedFolderSelector,
    unhighlightedNoteSelector,
} from 'src/store/selectors/navigation';
import { getSearchQuerySelector } from 'src/store/selectors/ui';

export const allNotesSelector = state => state.notes.items;
export const defaultFoldersSelector = state => state.folders.default;
export const userFoldersSelector = state => state.folders.userFolders;

export const allNotesUidsSelector = createSelector(
    allNotesSelector,
    allNotes => Object.keys(allNotes),
);

export const folderHierarchySelector = createSelector(
    userFoldersSelector,
    buildFolderHierarchy,
);

export const getSidebarFoldersSelector = createSelector(
    defaultFoldersSelector,
    folderHierarchySelector,
    (defaultFolders, userFolders) => defaultFolders.concat(userFolders),
);

export const folderTreeSelector = createSelector(
    getSidebarFoldersSelector,
    (...args) => (buildFolderTree(...args)),
);

export const flattenedFolderNodesSelector = createSelector(
    folderTreeSelector,
    getFlattenedFolderNodes,
);

export const noteUidsInCurrentFolderSelector = createSelector(
    allNotesSelector,
    unhighlightedFolderSelector,
    (allNotes, lastActiveFolder) => {
        const folderUid = lastActiveFolder || 'folder:notes';
        const allUids = Object.keys(allNotes);

        if (folderUid === 'folder:notes') return allUids;

        return allUids.filter(noteUid => allNotes[noteUid].folderUid === folderUid);
    },
);

export const getSearchInstanceSelector = createSelector(
    allNotesUidsSelector,
    allNotesSelector,
    (allNotesUids, allNotes) => {
        const search = new JsSearch('uid');
        search.searchIndex = new UnorderedSearchIndex();
        search.addIndex('title');
        search.addIndex('summary');

        search.addDocuments(allNotesUids.map(uid => (allNotes[uid])));

        return search;
    },
);

export const currentNotesUidsSelector = createSelector(
    noteUidsInCurrentFolderSelector,
    getSearchInstanceSelector,
    getSearchQuerySelector,
    (currentNoteuids, searchInstance, searchQuery) => {
        // there is no input query
        if (searchQuery.length < 1) return currentNoteuids;

        const searchMatches = searchInstance.search(searchQuery).map(note => note.uid);

        return intersection(currentNoteuids, searchMatches);
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

export const highlightedNoteUid = createSelector(
    highlightedItemSelector,
    currentNotesUidsSelector,
    (highlightedItem, currentNotes) => (
        highlightedItem.column === 2
            ? getHighlightedNote(highlightedItem.itemUid, currentNotes)
            : null
    ),
);

export const currentNoteUidSelector = createSelector(
    unhighlightedNoteSelector,
    currentNotesUidsSelector,
    getHighlightedNote,
);

export const currentNoteSelector = createSelector(
    currentNoteUidSelector,
    allNotesSelector,
    (currentNoteUid, notes) => notes[currentNoteUid],
);

export const currentNotesSelector = createSelector(
    currentNotesUidsSelector,
    allNotesSelector,
    (currentNotesUids, allNotes) => (currentNotesUids.map(uid => (allNotes[uid]))),
);
