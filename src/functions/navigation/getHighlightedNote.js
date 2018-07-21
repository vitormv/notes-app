import includes from 'lodash/includes';

const getHighlightedNote = (highlighted, notesUids) => {
    if (highlighted.column !== 2) return null;
    if (notesUids.length < 1) return null;

    return includes(notesUids, highlighted.itemUid) ? highlighted.itemUid : notesUids[0];
};

export { getHighlightedNote };
