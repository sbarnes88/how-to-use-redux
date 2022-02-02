import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from './redux/actions';
import { TodoList } from './components/TodoList';
import { TodoInput } from './components/TodoInput';
import { PropTypes } from 'prop-types';

export class App extends React.Component {
    render () {
        return (
            <div className="grid grid-cols-5 gap-3">
                <div className="">
                    <TodoInput addTodo={this.props.addTodo} onChange={this.handleChange} />
                </div>
                <div className="col-span-4">
                    <TodoList todos={this.props.todos} deleteTodo={this.props.deleteTodo} completeTodo={this.props.completeTodo} />
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addTodo: (payload) => {
            dispatch(addTodo(payload));
        },
        deleteTodo: (id) => {
            dispatch(deleteTodo(id));
        },
        completeTodo: (id) => {
            dispatch(toggleTodo(id));
        },
        dispatch,
        ownProps
    };
};

App.propTypes = {
    addTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    completeTodo: PropTypes.func,
    todos: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
