import React from 'react'
import { PropTypes } from 'prop-types'

export class TodoInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { text: '', dueDate: this.getFormattedDate(new Date()) }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  getFormattedDate (date) {
    let month = (date.getMonth() + 1).toString()
    let day = (date.getDate()).toString()
    if (month.length === 1) {
      month = '0' + month
    }
    if (day.length === 1) {
      day = '0' + day
    }
    const formattedDate = date.getFullYear() + '-' + month + '-' + day
    return formattedDate
  }

  handleAdd () {
    this.props.addTodo({ text: this.state.text, dueDate: this.state.dueDate })
    this.setState({ text: '' })
  }

  handleChange (event) {
    this.setState({ text: event.target.value })
  }

  handleDateChange (event) {
    this.setState({ dueDate: event.target.value })
  }

  render () {
    return (
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add a Todo Item</h3>
                    </div>
                    <div className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="todo-text" className="sr-only">
                                    Todo
                                </label>
                                <input
                                    value={this.state.text}
                                    onChange={this.handleChange}
                                    type="text"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Todo Item"
                                />
                            </div>
                            <div>
                                <label htmlFor="todo-due-date" className="sr-only">
                                    Due Date
                                </label>
                                <input
                                    value={this.state.dueDate}
                                    onChange={this.handleDateChange}
                                    type="date"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Due Date"
                                />
                            </div>
                        </div>
                        <div>
                            <button type="button" value="Add"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                                onClick={this.handleAdd}>
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <span className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Add
                            </button>
                            <button type="button" className="mt-2 group relative w-full flex justify-center rounded-md font-medium bg-green-600 border border-green-500 text-white py-1 px-2 hover:bg-green-800 hover:text-white" onClick={() => {
                              localStorage.setItem('todos', JSON.stringify(this.props.todos))
                            }}>
                                Save To Local Storage
                            </button>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
    )
  }
}

TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.array
}

export default TodoInput
