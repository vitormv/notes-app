import { createStore, applyMiddleware, compose } from 'redux';
import { isDevelopment } from 'src/functions/environment';
import createSagaMiddleware from 'redux-saga';
import { deleteFolderTreeWatcher } from 'src/store/sagas';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const sagas = [
    deleteFolderTreeWatcher,
];

const enhancers = [];
const middleware = [
    sagaMiddleware,
];

if (isDevelopment()) {
    const { devToolsExtension } = window;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
);

let unsubscribe;

export const getStore = (initialState = {}) => {
    if (typeof unsubscribe === 'function') {
        unsubscribe();
    }

    const store = createStore(
        rootReducer,
        initialState,
        composedEnhancers,
    );

    if (isDevelopment()) {
        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(rootReducer);
            });
        }
    }

    sagas.map(saga => sagaMiddleware.run(saga));

    return store;
};
