const hasHighlightedChild = (folder, highlightedUid) => {
    if (highlightedUid === folder.uid) return true;

    return folder.children.some(childFolder => hasHighlightedChild(childFolder, highlightedUid));
};

export { hasHighlightedChild };
