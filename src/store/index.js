import { isDevelopment } from 'src/functions/environment';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

const enhancers = [];
const middleware = [
    // thunk,
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

    return store;
};
