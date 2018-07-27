import { combineReducers } from 'redux';
import folders from 'src/store/reducers/folders';
import navigation from 'src/store/reducers/navigation';
import notes from 'src/store/reducers/notes';
import ui from 'src/store/reducers/ui';

export default combineReducers({
    folders,
    navigation,
    notes,
    ui,
});
