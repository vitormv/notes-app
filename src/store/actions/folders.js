export const ADD_FOLDER = 'ADD_FOLDER';
export const addFolderAction = (name, parentUid = null) => ({
    type: ADD_FOLDER,
    name,
    parentUid,
});

export const DELETE_FOLDER_TREE = 'DELETE_FOLDER_TREE';
export const deleteFolderNodeAction = folderUid => ({
    type: DELETE_FOLDER_TREE,
    folderUid,
});

export const DELETE_FOLDER_BY_UID = 'DELETE_FOLDER_BY_UID';
export const deleteFolderByUid = folderUid => ({
    type: DELETE_FOLDER_BY_UID,
    folderUid,
});
