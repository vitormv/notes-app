import { hasCollapsedParent } from 'src/functions/navigation';

export const getFlattenedFolderNodes = (folderTree) => {
    const folders = {};

    folderTree.walk((node) => {
        if (node.isRoot() || hasCollapsedParent(node)) return;

        folders[node.model.uid] = node;
    });

    return folders;
};
