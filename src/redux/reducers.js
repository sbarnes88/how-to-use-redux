
const getNextId = (state) => {
    if (state && state.todos) {
        return state.todos.reduce((maxId, todo) => {
            return Math.max(todo.id, maxId);
        }, 0) + 1;
    }
    return 0;
};

const todoReducer = (state = { todos: [] }, action) => {
    const currentTodos = state.todos === undefined || state.todos === null ? [] : state.todos;
    switch (action.type) {
    case 'GET_NEXT_ID':
        return getNextId(state);
    case 'ADD_TODO':
        return Object.assign({}, state, {
            todos: [{
                id: action.payload.id,
                text: action.payload.text,
                dueDate: action.payload.dueDate,
                completed: action.payload.completed || false
            }, ...currentTodos]
        });
    case 'DELETE_TODO':
        return Object.assign({}, state, {
            todos: currentTodos.filter(todo => todo.id !== action.id)
        });
    case 'TOGGLE_TODO':
        return Object.assign({}, state, {
            todos: currentTodos.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    });
                }
                return todo;
            })
        });
    default:
        return state;
    }
};

export default todoReducer;
