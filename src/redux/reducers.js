
const getNextId = (state) => {
  if (state && state.todos) {
    return state.todos.reduce((maxId, todo) => {
      return Math.max(todo.id, maxId)
    }, 0) + 1
  }
  return 0
}

const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [{
          id: getNextId(state),
          text: action.payload.text,
          dueDate: action.payload.dueDate,
          completed: false
        }, ...state.todos]
      })
    case 'DELETE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.filter(todo => todo.id !== action.id)
      })
    case 'TOGGLE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })
    default:
      return state
  }
}

export default todoReducer
