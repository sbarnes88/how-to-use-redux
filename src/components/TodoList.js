import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch } from '@headlessui/react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';


export class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.completeTodo = this.completeTodo.bind(this);
        this.itemRefs = [
        ];

    }

    componentDidUpdate() {
    }

    handleDrag(e) {
        e.target.parentNode.parentNode.style.zIndex = 2;
    }

    handleDragEnd(e) {
        e.target.parentNode.parentNode.style.zIndex = 1;
    }

    getTodoRef(id) {
        this.props.todos.filter(todo => todo.id === id)[0].ref = React.createRef();
    }

    completeTodo(todo) {
        this.props.completeTodo(todo.id);
        todo.completed = !todo.completed;
        this.props.todoHandler.updateTodo(todo).then(() => {
        });
    }

    deleteTodo(id) {
        this.props.todoHandler.deleteTodo(id).then(() => {
            this.props.deleteTodo(id);
        });
    }

    getFormattedDate(value) {
        var date = new Date(value);
        let month = (date.getMonth() + 1).toString();
        let day = (date.getDate()).toString();
        if (month.length === 1) {
            month = '0' + month;
        }
        if (day.length === 1) {
            day = '0' + day;
        }
        const formattedDate = date.getFullYear() + '-' + month + '-' + day;
        return formattedDate;
    }

    render() {
        return (

            <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-4">
                <div className="relative inline-block w-full">
                    <h2 className="text-center text-4xl border shadow-lg border-b text-white border-green-500 sm:rounded-lg bg-green-600 rounded-sm mb-2">Task List</h2>
                </div>
                <div className="shadow overflow-hidden tracking-wider border-gray-200 border-b sm:rounded-lg mt-2">
                    <div className="grid grid-cols-12 bg-gray-50 min-w-full divide-y divide-gray-200">
                        <div className="px-6 py-3 border-t text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            &nbsp;
                        </div>
                        <div className="col-span-4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Task Title
                        </div>
                        <div className="col-span-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                            Due Date
                        </div>
                        <div className="col-span-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                            Status
                        </div>
                        <div className="col-span-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <span className="sr-only">Delete</span>
                        </div>
                        <div>
                            <span className="sr-only">Complete</span>
                        </div>
                    </div>
                    {this.props.todos && this.props.todos !== null && this.props.todos.sort((a, b) => a.id > b.id).map(todo => {
                        return (
                            <Draggable key={todo.id} axis='y' handle="strong" onDrag={this.handleDrag} onStop={this.handleDragEnd}>
                                <div className="grid grid-cols-12 divide-y min-w-full bg-white/90 relative z-1" key={todo.id}>

                                    <div className="px-6 py-6 border-t border-gray-200 align-middle text-center text-xs font-medium text-gray-500">
                                        <strong>🟩</strong>
                                    </div>
                                    <div className="col-span-4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{todo.text}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        <div className="text-sm text-gray-900">{this.getFormattedDate(todo.dueDate)}</div>
                                    </div>
                                    <div className="col-span-2 px-4 py-3 text-center align-middle text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                        <span className={`${todo.completed ? 'bg-green-100 text-green-800`' : 'bg-red-100 text-red-800'} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                            {todo.completed ? 'Completed' : 'Incomplete'}
                                        </span>
                                    </div>

                                    <div className="col-span-2 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <Switch
                                            checked={todo.completed}
                                            onChange={() => this.completeTodo(todo)}
                                            className={`${todo.completed ? 'bg-teal-900' : 'bg-teal-500'}
                                relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                        >
                                            <span className="sr-only">Use setting</span>
                                            <span
                                                aria-hidden="true"
                                                className={`${todo.completed ? 'translate-x-9' : 'translate-x-0'}
                                  pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                            />
                                        </Switch>
                                    </div>
                                    <div className="text-center align-middle py-3">
                                        <button type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-200 text-base font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => this.deleteTodo(todo.id)}>
                                            🗑
                                        </button>
                                    </div>
                                </div>
                            </Draggable>
                        );
                    })}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

TodoList.propTypes = {
    deleteTodo: PropTypes.func,
    completeTodo: PropTypes.func,
    todoHandler: PropTypes.object,
    todos: PropTypes.array
};

export { TodoList as TodoListTest };
export default connect(mapStateToProps, null)(TodoList);