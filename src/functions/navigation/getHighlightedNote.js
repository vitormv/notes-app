import includes from 'lodash/includes';

const getHighlightedNote = (highlightedUid, notesUids) => (
    includes(notesUids, highlightedUid) ? highlightedUid : notesUids[0]
);

export { getHighlightedNote };
