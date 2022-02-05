export class TodoApiHandler {

    constructor() {
        this.baseUrl = 'http://localhost:5000/api/todo';
    }

    getNextId() {
        const url = `${this.baseUrl}/id`;
        return fetch(url)
            .then(response => response.json());
    }
    
    getTodos() {
        return fetch(this.baseUrl)
            .then(response => {
                console.log(response);
                return response.json();
            });
    }

    addTodo(todo) {
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo),
            redirect: 'follow'
        })
            .then(response => response);
    }

    deleteTodo(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE'
        })
            .then(response => response);
    }

    updateTodo(todo) {
        return fetch(`${this.baseUrl}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(response => response);
    }
}

export default TodoApiHandler;