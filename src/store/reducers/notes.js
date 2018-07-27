import { DELETE_FOLDER_BY_UID } from 'src/store/actions/folders';
import bigList from './bigListOfNotes.json';

const defaultState = {
    items: bigList,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case DELETE_FOLDER_BY_UID: {
            const updatedNotes = {};

            Object.values(state.items).forEach((note) => {
                // ignore notes unrelated to this folder
                if (note.folderUid !== action.folderUid) return;

                updatedNotes[note.uid] = {
                    ...state.items[note.uid],
                    folderUid: null,
                };
            });

            return {
                ...state,
                items: {
                    ...state.items,
                    ...updatedNotes,
                },
            };
        }

        default:
            return state;
    }
};
