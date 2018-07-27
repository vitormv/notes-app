import {
    NAVIGATION_HIGHLIGHT_COLUMN,
    NAVIGATION_HIGHLIGHT_ITEM,
    NAVIGATION_UNHIGHLIGHT_ITEM,
} from 'src/store/actions';

const defaultState = {
    highlightedUid: {
        column: 1,
        itemUid: null,
    },
    unhighlighted: {
        folder: 'folder:notes',
        note: null,
    },
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case NAVIGATION_HIGHLIGHT_ITEM:
            return {
                ...state,
                highlightedUid: {
                    ...state.highlightedUid,
                    column: action.column,
                    itemUid: action.itemUid,
                },
                unhighlighted: {
                    ...state.unhighlighted,
                    [(action.column === 1) ? 'folder' : 'note']: action.itemUid,
                },
            };

        case NAVIGATION_UNHIGHLIGHT_ITEM:
            return {
                ...state,
                unhighlighted: {
                    ...state.unhighlighted,
                    [(action.column === 1) ? 'folder' : 'note']: action.itemUid,
                },
            };

        case NAVIGATION_HIGHLIGHT_COLUMN: {
            const itemUid = state.unhighlighted[(action.column === 1) ? 'folder' : 'note'];

            // if (action.column === 2 && !itemUid) {
            //     itemUid = (state.current.length > 0) ? state.current[0] : null;
            // }

            return {
                ...state,
                highlightedUid: {
                    ...state.highlightedUid,
                    column: action.column,
                    itemUid,
                },
            };
        }

        default:
            return state;
    }
};
