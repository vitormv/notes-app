const hasAnyHighlightedChild = (folder, highlightedUid, unhighlightedUid) => {
    if (highlightedUid === folder.uid || unhighlightedUid === folder.uid) return true;

    return folder.children.some(childFolder => (
        hasAnyHighlightedChild(childFolder, highlightedUid, unhighlightedUid)
    ));
};

export { hasAnyHighlightedChild };
