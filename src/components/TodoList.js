import React from "react";
import { Switch } from "@headlessui/react";

export class TodoList extends React.Component {
    render() {
        return (

            <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-4">
                <div className="relative inline-block w-full">
                    <h2 className="text-center text-4xl border shadow-lg border-b text-white border-green-500 sm:rounded-lg bg-green-600 rounded-sm mb-2">Task List</h2>
                </div>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-2">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Task Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <span className="sr-only">Delete</span>
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Complete</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {this.props.todos.sort((a, b) => a.id > b.id).map(todo => {
                                return (
                                    <tr key={todo.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{todo.text}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{todo.dueDate}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`${todo.completed ? 'bg-green-100 text-green-800`' : 'bg-red-100 text-red-800'} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                                {todo.completed ? 'Completed' : 'Incomplete'}
                                            </span>
                                        </td>



                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Switch
                                                checked={todo.completed}
                                                onChange={() => this.props.completeTodo(todo.id)}
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
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                                            <button type="button"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-200 text-base font-medium text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => this.props.deleteTodo(todo.id)}>
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}