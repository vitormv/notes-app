export const getNextHighlightedFolder = (arrowKey, flattenedFolders, highlighted) => {
    const uids = Object.keys(flattenedFolders);
    const highlightedUid = highlighted || uids[0];
    const currentIndex = uids.indexOf(highlightedUid);

    switch (arrowKey) {
        case 'up':
            return uids[Math.max(currentIndex - 1, 0)];
        case 'down':
            return uids[Math.min(currentIndex + 1, uids.length - 1)];
        default:
            return null;
    }
};
