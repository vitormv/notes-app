import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { App } from 'src/containers/App';
import { getStore } from 'src/store';
import 'src/font-awesome';
import 'src/styles/main.scss';

const target = document.getElementById('js-notes-app');

const mount = (options = {}) => {
    const store = getStore({});

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        target,
    );

    // If HMR is enabled, we rerender the application
    // if anything has changed.
    if (module.hot) {
        module.hot.accept(['./containers/App'], () => {
            const NextApp = require('./containers/App'); // eslint-disable-line global-require

            render(
                <Provider store={store}>
                    <NextApp />
                </Provider>,
                target,
            );
        });
    }
};

mount();
