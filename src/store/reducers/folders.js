import omit from 'lodash/omit';
import { ADD_FOLDER, DELETE_FOLDER_BY_UID, RENAME_FOLDER } from 'src/store/actions/folders';
import { COLLAPSE_FOLDER } from 'src/store/actions/navigation';

const makeid = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

const defaultState = {
    default: [
        {
            uid: 'folder:notes',
            label: 'notes',
            iconClass: 'note',
            classSuffix: '',
            isCollapsed: false,
            isDefault: true,
            children: [],
        },
        {
            uid: 'folder:favorites',
            label: 'favorites',
            iconClass: 'star',
            classSuffix: '',
            isCollapsed: false,
            isDefault: true,
            children: [],
        },
        {
            uid: 'folder:trash',
            label: 'trash',
            iconClass: 'trash',
            classSuffix: '',
            isCollapsed: false,
            isDefault: true,
            children: [],
        },
    ],
    userFolders: {
        uidFolder1: {
            uid: 'uidFolder1',
            label: 'forró',
            iconClass: 'circle',
            isCollapsed: false,
            parent: null,
        },
        uidFolder2: {
            uid: 'uidFolder2',
            label: 'personal',
            iconClass: 'circle',
            isCollapsed: false,
            parent: null,
        },
        uidFolder3: {
            uid: 'uidFolder3',
            label: 'ideas',
            iconClass: 'circle',
            isCollapsed: false,
            parent: 'uidFolder2',
        },
        uidFolder31: {
            uid: 'uidFolder31',
            label: 'home',
            iconClass: 'circle',
            isCollapsed: false,
            parent: 'uidFolder2',
        },
        uidFolder311: {
            uid: 'uidFolder311',
            label: 'shopping list',
            iconClass: 'circle',
            isCollapsed: false,
            parent: 'uidFolder31',
        },
        uidFolder312: {
            uid: 'uidFolder312',
            label: 'chores',
            iconClass: 'circle',
            isCollapsed: false,
            parent: 'uidFolder31',
        },
        uidFolder313: {
            uid: 'uidFolder313',
            label: 'renovating plans',
            iconClass: 'circle',
            isCollapsed: false,
            parent: 'uidFolder31',
        },
        uidFolder4: {
            uid: 'uidFolder4',
            label: 'meditation',
            iconClass: 'circle',
            isCollapsed: false,
            parent: null,
        },
        uidFolder5: {
            uid: 'uidFolder5',
            label: 'work',
            iconClass: 'circle',
            isCollapsed: false,
            parent: null,
        },
    },
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case COLLAPSE_FOLDER: {
            return {
                ...state,
                userFolders: {
                    ...state.userFolders,
                    [action.folderUid]: {
                        ...state.userFolders[action.folderUid],
                        isCollapsed: action.isCollapsed,
                    },
                },
            };
        }

        case ADD_FOLDER: {
            const newUid = makeid();

            return {
                ...state,
                userFolders: {
                    ...state.userFolders,
                    [newUid]: {
                        uid: newUid,
                        label: action.name,
                        iconClass: 'circle',
                        isCollapsed: false,
                        isDefault: false,
                        parent: action.parentUid,
                    },
                },
            };
        }

        case RENAME_FOLDER: {
            return {
                ...state,
                userFolders: {
                    ...state.userFolders,
                    [action.folderUid]: {
                        ...state.userFolders[action.folderUid],
                        label: action.name,
                    },
                },
            };
        }

        case DELETE_FOLDER_BY_UID: {
            return {
                ...state,
                userFolders: omit(state.userFolders, [action.folderUid]),
            };
        }

        default:
            return state;
    }
};
