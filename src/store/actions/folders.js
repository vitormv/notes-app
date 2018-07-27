export const ADD_FOLDER = 'ADD_FOLDER';
export const addFolderAction = (name, parentUid = null) => ({
    type: ADD_FOLDER,
    name,
    parentUid,
});

export const DELETE_FOLDER_REQUEST = 'DELETE_FOLDER_REQUEST';
export const deleteFolderRequestAction = folderUid => ({
    type: DELETE_FOLDER_REQUEST,
    folderUid,
});

export const DELETE_FOLDER = 'DELETE_FOLDER';
export const deleteFolderAction = folderUid => ({
    type: DELETE_FOLDER,
    folderUid,
});
