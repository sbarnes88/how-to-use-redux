import { test, expect } from '@jest/globals';
import TodoInput from './TodoInput';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });
test('it creates TodoInput', () => {
    expect(TodoInput).toBeDefined();
});

test('it passes in props', () => {
    const props = {
        addTodo: () => { }
    };
    const wrapper = shallow(<TodoInput addTodo={props.addTodo} />);
    const instance = wrapper.instance();
    expect(instance.props.addTodo).toBeDefined();
});

test('executes handleAdd', () => {
    let index = 0;
    const props = {
        addTodo: () => { ++index; }
    };
    const wrapper = shallow(<TodoInput addTodo={props.addTodo} />);
    const instance = wrapper.instance();
    instance.handleAdd();
    expect(index).toBe(1);
});

test('gets formatted date', () => {
    const props = {
        addTodo: () => {}
    };
    const wrapper = shallow(<TodoInput {...props} />);
    const instance = wrapper.instance();
    const date = new Date(2022, 1, 1);
    expect(instance.getFormattedDate(date)).toBe('2022-02-01');
});
