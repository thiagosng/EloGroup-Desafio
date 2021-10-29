import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import { store } from './redux/helpers';
import App from './app';

// configurar back-end falso
import { configureFakeBackend } from './redux/helpers';
configureFakeBackend();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);