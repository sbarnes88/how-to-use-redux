import todoReducer from './reducers';
import { addTodo, deleteTodo, updateTodo, toggleTodo } from './actions';
import { test, expect } from '@jest/globals';

test('should return empty list', () => {
    expect(todoReducer(undefined, { todos: [] })).toEqual({ todos: [] });
});

test('should add item', () => {
    addTodo({ id: 0, text: 'test', completed: false });
    expect(addTodo({ id: 0, text: 'test', completed: false }))
        .toEqual({ type: 'ADD_TODO', payload: { id: 0, text: 'test', completed: false } });
});

test('should delete item', () => {
    addTodo({ id: 0, text: 'test', completed: false });
    deleteTodo(0);
    expect(deleteTodo(0)).toEqual({ type: 'DELETE_TODO', id: 0 });
});

test('should update item', () => {
    expect(updateTodo(0, 'test2')).toEqual({ type: 'UPDATE_TODO', id: 0, text: 'test2' });
});

test('should toggle item', () => {
    expect(toggleTodo(0)).toEqual({ type: 'TOGGLE_TODO', id: 0 });
});
