import { test, expect } from '@jest/globals';
import TodoInput, { TodoInputTest } from './TodoInput';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import '@testing-library/jest-dom';
import createStoreInstance from '../redux/store';
import { Provider } from 'react-redux';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jest, describe, beforeEach } from '@jest/globals';



let initialState = {
    todos:
        [
            { id: 1, completed: true, text: 'test1' },
            { id: 2, completed: false, text: 'test2' },
            { id: 3, completed: false, text: 'test3' }
        ],
};
configure({ adapter: new Adapter() });
describe('My Connected React-Redux Component', () => {
    let store;

    beforeEach(() => {
        store = createStoreInstance(initialState);
    });

    test('it passes in props', () => {
        const props = {
            addTodo: () => { }
        };
        const wrapper = shallow(
            <Provider store={store}>
                <TodoInput store={store} addTodo={props.addTodo} getNextId={() => 1}
                    todoHandler={{ item: '' }} todos={initialState.todos}
                />
            </Provider >
        );
        expect(wrapper.props().children.props.addTodo).toBeDefined();
    });

    test('it should call add todo', () => {
        const props = {
            addTodo: jest.fn()
        };
        render(
            <Provider store={store}>
                <TodoInput addTodo={props.addTodo}
                    getNextId={() => 1}
                    todoHandler={{
                        item: '', getNextId: async () => {
                            props.addTodo();
                        }, addTodo: async () => 1
                    }}
                    todos={initialState.todos}
                />
            </Provider>
        );
        userEvent.click(screen.getByText('Add'));
        expect(props.addTodo).toHaveBeenCalled();
    });

    test('it changes the date', () => {
        const props = {
            addTodo: jest.fn()
        };
        const wrapper = shallow(
            <TodoInputTest addTodo={props.addTodo}
                getNextId={() => 1}
                todoHandler={{
                    item: '', getNextId: async () => {
                        props.addTodo();
                    }, addTodo: async () => 1
                }}
                todos={initialState.todos}
            />
        );
        const input = wrapper.instance();
        input.handleDateChange({ target: { value: '2022-01-01' } });
        expect(input.state.dueDate).toBe('2022-01-01');
    });
});

