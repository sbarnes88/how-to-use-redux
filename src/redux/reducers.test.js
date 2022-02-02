import todoReducer from './reducers';
import { test, expect } from '@jest/globals';

test('should add todo and increment id', () => {
    expect(todoReducer({ todos: [] }, { type: 'ADD_TODO', payload: { text: 'Hello' } }))
        .toStrictEqual({ todos: [{ completed: false, dueDate: undefined, id: 1, text: 'Hello' }] });
});

test('should delete id', () => {
    expect(todoReducer({ todos: [{ id: 1, text: 'Hello' }] }, { type: 'DELETE_TODO', id: 1 }))
        .toStrictEqual({ todos: [] });
});

test('should toggle id', () => {
    expect(todoReducer({ todos: [{ id: 1, text: 'Hello', completed: false }] }, { type: 'TOGGLE_TODO', id: 1 }))
        .toStrictEqual({ todos: [{ id: 1, text: 'Hello', completed: true }] });
});
