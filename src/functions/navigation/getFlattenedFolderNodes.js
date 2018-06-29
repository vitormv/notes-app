export const getFlattenedFolderNodes = (folderTree) => {
    const folders = {};

    folderTree.walk((node) => {
        if (node.model.uid) {
            folders[node.model.uid] = node;
        }
    });

    return folders;
};
