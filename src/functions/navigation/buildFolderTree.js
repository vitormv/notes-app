import TreeModel from 'tree-model';

export const buildFolderTree = (folders) => {
    const tree = new TreeModel();

    return tree.parse({ id: null, isCollapsed: false, children: folders });
};
