import { takeEvery, select, put } from 'redux-saga/effects';
import { COLLAPSE_FOLDER, navigationHighlightItemAction } from 'src/store/actions';
import { folderTreeSelector, unhighlightedFolderSelector } from 'src/store/selectors';

function* onCollapseFolderWorker(collapseFolderAction) {
    // folder is being expanded: nothing to do here
    if (!collapseFolderAction.isCollapsed) return;

    const folderTree = yield select(folderTreeSelector);
    const nodeBeingCollapsed = folderTree.first(node => (
        node.model.uid === collapseFolderAction.folderUid
    ));

    const unhighlightedFolderUid = yield select(unhighlightedFolderSelector);

    const hasAnyHighlightedChild = nodeBeingCollapsed.first(node => (
        node.model.uid === unhighlightedFolderUid
    ));

    // if the folder being collapsed has any (un)highlighted child,
    // the highlight has to go to its parent
    if (hasAnyHighlightedChild) {
        yield put(navigationHighlightItemAction(1, collapseFolderAction.folderUid));
    }
}

export function* collapseFolderWatcher() {
    yield takeEvery(COLLAPSE_FOLDER, onCollapseFolderWorker);
}
