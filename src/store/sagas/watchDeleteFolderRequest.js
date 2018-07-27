import { takeEvery, select, put } from 'redux-saga/effects';
import { DELETE_FOLDER_TREE, deleteFolderByUid } from 'src/store/actions/folders';
import { folderTreeSelector } from 'src/store/selectors';

function* onDeleteFolderRequestWorker(deleteFolderAction) {
    const folderTree = yield select(folderTreeSelector);

    const nodeToDelete = folderTree.first(node => node.model.uid === deleteFolderAction.folderUid);

    const childrenUids = [];

    // walk the tree
    nodeToDelete.walk({ strategy: 'post' }, (node) => {
        childrenUids.push(node.model.uid);
    });

    for (let i = 0; i < childrenUids.length; i += 1) {
        yield put(deleteFolderByUid(childrenUids[i]));
    }
}

export function* watchDeleteFolderRequest() {
    yield takeEvery(DELETE_FOLDER_TREE, onDeleteFolderRequestWorker);
}
