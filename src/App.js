import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo, getNextId } from './redux/actions';
import { TodoList } from './components/TodoList';
import { TodoInput } from './components/TodoInput';
import { PropTypes } from 'prop-types';
import TodoApiHandler from './handlers/todo-api-handler';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.todoApiHandler = new TodoApiHandler();
    }

    componentDidMount() {
        this.todoApiHandler.getTodos().then(k => {
            for(const todo of k) {
                this.props.addTodo(todo);
            }
            console.log(k);
        });
    }

    render () {
        return (
            <div className="grid grid-cols-5 gap-3">
                <div className="">
                    <TodoInput getNextId={this.props.getNextId} todos={this.props.todos} addTodo={this.props.addTodo} onChange={this.handleChange} todoHandler={this.todoApiHandler} />
                </div>
                <div className="col-span-4">
                    <TodoList todos={this.props.todos} deleteTodo={this.props.deleteTodo} completeTodo={this.props.completeTodo} todoHandler={this.todoApiHandler} />
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
        getNextId: () => {
            dispatch(getNextId());
        },
        dispatch,
        ownProps
    };
};

App.propTypes = {
    addTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    completeTodo: PropTypes.func,
    getNextId: PropTypes.func,
    todos: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
