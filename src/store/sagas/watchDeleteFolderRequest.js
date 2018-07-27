import { takeEvery, select } from 'redux-saga/effects';
import { DELETE_FOLDER_REQUEST } from 'src/store/actions/folders';
import { folderTreeSelector } from 'src/store/selectors';

function* onDeleteFolderRequestWorker(deleteFolderAction) {
    yield console.log('SAAAAAAGAAA');

    const items = yield select(folderTreeSelector);

    console.log(items);


    // const options = yield getContext('options');
    // const { searchEndpoint } = options;
    //
    // const request = yield call(requestSearchResultsCall, searchEndpoint);
    // const response = yield request.json();
    //
    // yield all([
    //     call(storeResults, response),
    //     call(storeData, response),
    //     call(createFilters, response),
    // ]);
}

export function* watchDeleteFolderRequest() {
    yield takeEvery(DELETE_FOLDER_REQUEST, onDeleteFolderRequestWorker);
}
