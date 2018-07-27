import TreeModel from 'tree-model';

const ROOT_UID = 'root';

const buildFolderTree = (folders) => {
    const tree = new TreeModel();

    return tree.parse({ uid: ROOT_UID, children: folders });
};

const isRootNode = node => (node.model.uid === ROOT_UID || !node.parent);

export { buildFolderTree, isRootNode };
