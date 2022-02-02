import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import React from 'react';
import createStoreInstance from './redux/store';
import { test } from '@jest/globals';

const initialState = {
    todos: []
};

const store = createStoreInstance(initialState);

test('renders learn react link', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>);
});
