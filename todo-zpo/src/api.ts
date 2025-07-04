import type { Todo } from './types';

const BASE_URL = 'http://localhost:8080/api/todos';

export const getTodos = async (): Promise<Todo[]> => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
    });
    return res.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    return res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};
