import TreeModel from 'tree-model';

const ROOT_UID = 'root';

const buildFolderTree = (folders) => {
    const tree = new TreeModel();

    return tree.parse({ uid: ROOT_UID, isRoot: true, children: folders });
};

export { buildFolderTree };
