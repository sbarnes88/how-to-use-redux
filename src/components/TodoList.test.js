import { test, expect } from '@jest/globals';
import TodoList from './TodoInput';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });
test('expect to be defined', () => {
    expect(TodoList).toBeDefined();
});

test('expect delete to be called', () => {
    let index = 0;
    const props = {
        deleteTodo: () => { index--; }
    };
    const wrapper = shallow(<TodoList {...props} />);
    const instance = wrapper.instance();
    instance.props.deleteTodo(0);
    expect(index).toBe(-1);
});

test('expect complete todo to be called', () => {
    let index = 0;
    const props = {
        completeTodo: () => { index = 42; }
    };
    const wrapper = shallow(<TodoList {...props} />);
    const instance = wrapper.instance();
    instance.props.completeTodo(0);
    expect(index).toBe(42);
});

test('expect props.todos to contain data', () => {
    const props = {
        todos: [{
            id: 0,
            text: 'test',
            completed: false
        }]
    };
    const wrapper = shallow(<TodoList {...props} />);
    const instance = wrapper.instance();
    expect(instance.props.todos).toBeDefined();
});
