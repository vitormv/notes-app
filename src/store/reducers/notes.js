import { NAVIGATION_HIGHLIGHT_ITEM, UI_LOADED } from 'src/store/actions';
import { COLLAPSE_FOLDER, NAVIGATION_HIGHLIGHT_COLUMN } from 'src/store/actions/navigation';

const defaultState = {
    ui: {
        isLoading: true,
    },
    navigation: {
        highlighted: {
            column: 1,
            itemUid: null,
        },
        selected: {
            folder: 'folder:notes',
            note: null,
        },
    },
    current: [
        'uid1', 'uid2', 'uid3', 'uid4', 'uid5', 'uid6', 'uid7', 'uid8', 'uid9', 'uid10', 'uid11', 'uid12', 'uid13',
    ],
    folders: {
        uidFolder1: {
            uid: 'uidFolder1',
            label: 'forró',
            iconClass: 'icon-circle',
            isCollapsed: false,
            parent: null,
        },
        uidFolder2: {
            uid: 'uidFolder2',
            label: 'personal',
            iconClass: 'icon-circle',
            isCollapsed: false,
            parent: null,
        },
        uidFolder3: {
            uid: 'uidFolder3',
            label: 'ideas',
            iconClass: 'icon-circle',
            isCollapsed: false,
            parent: 'uidFolder2',
        },
        uidFolder31: {
            uid: 'uidFolder31',
            label: 'home',
            iconClass: 'icon-circle',
            isCollapsed: false,
            parent: 'uidFolder2',
        },
        uidFolder311: {
            uid: 'uidFolder311',
            label: 'shopping list',
            iconClass: 'icon-circle',
            isCollapsed: false,
            parent: 'uidFolder31',
        },
        uidFolder312: {
            uid: 'uidFolder312',
            label: 'chores',
            iconClass: 'icon-circle',
            isCollapsed: false,
            parent: 'uidFolder31',
        },
        uidFolder313: {
            uid: 'uidFolder313',
            label: 'renovating plans',
            iconClass: 'icon-circle',
            isCollapsed: false,
            parent: 'uidFolder31',
        },
        uidFolder4: {
            uid: 'uidFolder4',
            label: 'meditation',
            iconClass: 'icon-circle',
            isCollapsed: false,
            parent: null,
        },
        uidFolder5: {
            uid: 'uidFolder5',
            label: 'work',
            iconClass: 'icon-circle',
            isCollapsed: false,
            parent: null,
        },
    },
    notes: {
        uid1: {
            uid: 'uid1',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid2: {
            uid: 'uid2',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid3: {
            uid: 'uid3',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid4: {
            uid: 'uid4',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid5: {
            uid: 'uid5',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid6: {
            uid: 'uid6',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid7: {
            uid: 'uid7',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid8: {
            uid: 'uid8',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid9: {
            uid: 'uid9',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid10: {
            uid: 'uid10',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid11: {
            uid: 'uid11',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid12: {
            uid: 'uid12',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
        uid13: {
            uid: 'uid13',
            title: 'Some fancy title would go in here',
            updatedAt: 1529176116,
            summary: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        },
    },
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case NAVIGATION_HIGHLIGHT_ITEM:
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    highlighted: {
                        ...state.navigation.highlighted,
                        column: action.column,
                        itemUid: action.itemUid,
                    },
                    selected: {
                        ...state.navigation.selected,
                        [(action.column === 1) ? 'folder' : 'note']: action.itemUid,
                    },
                },
            };

        case NAVIGATION_HIGHLIGHT_COLUMN: {
            let itemUid = state.navigation.selected[(action.column === 1) ? 'folder' : 'note'];

            if (action.column === 2 && !itemUid) {
                itemUid = (state.current.length > 0) ? state.current[0] : null;
            }

            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    highlighted: {
                        ...state.navigation.highlighted,
                        column: action.column,
                        itemUid,
                    },
                },
            };
        }

        case COLLAPSE_FOLDER: {
            return {
                ...state,
                folders: {
                    ...state.folders,
                    [action.folderUid]: {
                        ...state.folders[action.folderUid],
                        isCollapsed: action.isCollapsed,
                    },
                },
            };
        }

        case UI_LOADED: {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isLoading: action.isLoading,
                },
            };
        }

        default:
            return state;
    }
};
