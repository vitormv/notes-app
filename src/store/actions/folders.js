export const ADD_FOLDER = 'ADD_FOLDER';
export const addFolderAction = (name, parentUid = null) => ({
    type: ADD_FOLDER,
    name,
    parentUid,
});
