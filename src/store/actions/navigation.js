import { getNextHighlightedFolder, getNextHighlightedNote } from 'src/functions/navigation';

const DISCARD_ACTION = {
    type: 'DISCARD',
};

export const NAVIGATION_HIGHLIGHT_ITEM = 'NAV_HIGHLIGHT_ITEM';
export const navigationHighlightItem = (column, itemUid) => ({
    type: NAVIGATION_HIGHLIGHT_ITEM,
    column,
    itemUid,
});

export const NAVIGATION_HIGHLIGHT_COLUMN = 'NAVIGATION_HIGHLIGHT_COLUMN';
export const navigationHighlightColumn = column => ({
    type: NAVIGATION_HIGHLIGHT_COLUMN,
    column,
});

export const COLLAPSE_FOLDER = 'COLLAPSE_FOLDER';
export const collapseFolder = (folderUid, isCollapsed) => ({
    type: COLLAPSE_FOLDER,
    folderUid,
    isCollapsed,
});

export const navigationSelectFolderAction = itemUid => (navigationHighlightItem(1, itemUid));
export const navigationSelectNoteAction = itemUid => (navigationHighlightItem(2, itemUid));

export const foldersColumnArrowKeyNavigationAction = (
    arrowKey,
    flattenedFolders,
    highlightedItem,
) => {
    switch (arrowKey) {
        case 'up':
        case 'down':
            return navigationSelectFolderAction(getNextHighlightedFolder(
                arrowKey,
                flattenedFolders,
                highlightedItem.itemUid,
            ));
        case 'left': {
            if (highlightedItem.itemUid && flattenedFolders[highlightedItem.itemUid]) {
                const node = flattenedFolders[highlightedItem.itemUid];

                if (node.children.length > 0 && !node.data.isCollapsed) {
                    return collapseFolder(highlightedItem.itemUid, true);
                } else if (node.parent && !node.parent.isRoot()) {
                    return navigationHighlightItem(1, node.parent.data.uid);
                }
            }

            break;
        }

        case 'right': {
            if (highlightedItem.itemUid && flattenedFolders[highlightedItem.itemUid]) {
                const node = flattenedFolders[highlightedItem.itemUid];

                if (node.children.length > 0 && node.data.isCollapsed) {
                    return collapseFolder(highlightedItem.itemUid, false);
                }
            }

            return navigationHighlightColumn(2);
        }

        default:
            return DISCARD_ACTION;
    }

    return DISCARD_ACTION;
};

export const notesColumnArrowKeyNavigationAction = (
    arrowKey,
    notesUids,
    highlightedItem,
) => {
    if (arrowKey === 'up' || arrowKey === 'down') {
        return navigationSelectNoteAction(getNextHighlightedNote(
            arrowKey,
            notesUids,
            highlightedItem.itemUid,
        ));
    } else if (arrowKey === 'right') {
        return DISCARD_ACTION;
    } else if (arrowKey === 'left') {
        return navigationHighlightColumn(1);
    }

    return DISCARD_ACTION;
};
