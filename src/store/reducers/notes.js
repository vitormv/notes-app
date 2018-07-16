import {
    NAVIGATION_HIGHLIGHT_ITEM,
    UI_LOADED,
    UPDATE_SEARCH_QUERY,
} from 'src/store/actions';
import { COLLAPSE_FOLDER, NAVIGATION_HIGHLIGHT_COLUMN } from 'src/store/actions/navigation';
import bigList from './bigListOfNotes.json';

const defaultState = {
    ui: {
        isLoading: true,
        searchQuery: '',
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
    current: Object.keys(bigList),
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
    notes: bigList,
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

        case UPDATE_SEARCH_QUERY: {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    searchQuery: action.searchQuery,
                },
            };
        }

        default:
            return state;
    }
};
