export const addTodo = (payload) => {
    return { type: 'ADD_TODO', payload };
};

export const deleteTodo = (id) => {
    return { type: 'DELETE_TODO', id };
};

export const updateTodo = (id, text) => {
    return { type: 'UPDATE_TODO', id, text };
};

export const toggleTodo = (id) => {
    return { type: 'TOGGLE_TODO', id };
};
