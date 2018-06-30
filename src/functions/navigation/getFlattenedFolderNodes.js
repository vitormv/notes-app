const hasCollapsedParentId = (nodeId, collapsedIds) => (
    collapsedIds.some(id => (nodeId.indexOf(id) === 0 && nodeId.length > id.length))
);

export const getFlattenedFolderNodes = (folderTree) => {
    const folders = {};
    const collapsedNodeIds = [];

    folderTree.traverseDown((node) => {
        if (node.isRoot()) return;

        // mark node as collapsed
        if (node.data.isCollapsed) {
            collapsedNodeIds.push(node.id);
        }

        if (!hasCollapsedParentId(node.id, collapsedNodeIds)) {
            folders[node.data.uid] = node;
        }
    });

    return folders;
};
