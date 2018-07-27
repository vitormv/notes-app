import { takeEvery, select, put } from 'redux-saga/effects';
import { navigationHighlightItemAction, navigationUnhighlightItemAction } from 'src/store/actions';
import { DELETE_FOLDER_TREE, deleteFolderByUid } from 'src/store/actions/folders';
import { folderTreeSelector, highlightedFolderUidSelector, unhighlightedFolderSelector } from 'src/store/selectors';

const getFolderLeafs = (folderNode) => {
    const childrenUids = [];

    folderNode.walk({ strategy: 'post' }, (childNode) => {
        childrenUids.push(childNode.model.uid);
    });

    return childrenUids;
}

function* onDeleteFolderRequestWorker(deleteFolderAction) {
    const folderTree = yield select(folderTreeSelector);
    const nodeToDelete = folderTree.first(node => node.model.uid === deleteFolderAction.folderUid);

    // delete each folder, starting from the leafs and going up the tree
    const childrenNodes = getFolderLeafs(nodeToDelete);

    for (let i = 0; i < childrenNodes.length; i += 1) {
        yield put(deleteFolderByUid(childrenNodes[i]));
    }

    // after deleting the folders, we might need to change the current (un)highlighted folder
    const unhighlightedFolderUid = yield select(unhighlightedFolderSelector);
    const highlightedChild = nodeToDelete.first(node => node.model.uid === unhighlightedFolderUid);

    // delete folder (or its children) were not highlighted. Nothing more to do.
    if (!highlightedChild) return;

    if (unhighlightedFolderUid) yield put(navigationUnhighlightItemAction(1, 'folder:notes'));
}

export function* watchDeleteFolderTree() {
    yield takeEvery(DELETE_FOLDER_TREE, onDeleteFolderRequestWorker);
}
