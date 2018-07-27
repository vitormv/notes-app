import cloneDeep from 'lodash/cloneDeep';

export const buildFolderHierarchy = (userFolders) => {
    const folderStructure = [];
    const folders = cloneDeep(userFolders);

    Object.keys(folders).forEach((folderUid) => {
        const currentFolder = folders[folderUid];

        if (!currentFolder.children) {
            currentFolder.children = [];
        }

        if (currentFolder.parent === null) {
            folderStructure.push(currentFolder);
        } else {
            if (!folders[currentFolder.parent].children) {
                folders[currentFolder.parent].children = [];
            }

            folders[currentFolder.parent].children.push(currentFolder);
        }
    });

    return folderStructure;
};
