import {createStore} from 'redux';
import todoReducer from './reducers';

export default function createStoreInstance(initialState = {}) {
    const store = createStore(todoReducer, initialState);
    return store;
};