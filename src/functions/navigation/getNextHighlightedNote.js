export const getNextHighlightedNote = (arrowKey, notesUids, highlighted) => {
    const numberOfNotes = notesUids.length;
    const highlightedUid = highlighted || notesUids[0];

    const currentIndex = notesUids.indexOf(highlightedUid);

    if (arrowKey === 'up') {
        return notesUids[Math.max(currentIndex - 1, 0)];
    }

    return notesUids[Math.min(currentIndex + 1, numberOfNotes - 1)];
};
