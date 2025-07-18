import { useEffect, useState } from 'react';
import { getTodos, addTodo as apiAddTodo, updateTodo, deleteTodo as apiDeleteTodo } from '../api';
import { Client, over } from 'stompjs';
import SockJS from 'sockjs-client';
import type { Todo } from '../types';
import './TodoPage.css';

let stompClient: Client | null = null;

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        getTodos().then(setTodos);
        connectWebSocket();
    }, []);

    const connectWebSocket = () => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = over(socket);

        stompClient.connect({}, () => {
            stompClient?.subscribe('/topic/todos', message => {
                const todo: Todo = JSON.parse(message.body);
                setTodos(prev => {
                    const exists = prev.find(t => t.id === todo.id);
                    return exists
                        ? prev.map(t => t.id === todo.id ? todo : t)
                        : [todo, ...prev];
                });
            });

            stompClient?.subscribe('/topic/todos/deleted', message => {
                const id = parseInt(message.body);
                setTodos(prev => prev.filter(t => t.id !== id));
            });
        });
    };

    const handleAdd = async () => {
        if (!newTodo.trim()) return;
        await apiAddTodo(newTodo.trim());
        setNewTodo('');
    };

    const handleToggle = async (todo: Todo) => {
        await updateTodo({ ...todo, completed: !todo.completed });
    };

    const handleDelete = async (id: number) => {
        await apiDeleteTodo(id);
    };

    const handleEdit = async (todo: Todo, newTitle: string) => {
        if (!newTitle.trim()) return;
        await updateTodo({ ...todo, title: newTitle.trim() });
        setEditingId(null);
        setEditingText('');
    };

    const startEditing = (todo: Todo) => {
        setEditingId(todo.id);
        setEditingText(todo.title);
    };

    return (
        <div className="todo-page">
            <header>
                <h1>Todo List</h1>
            </header>
            <div className="add-task">
                <input
                    type="text"
                    placeholder="Dodaj nowe zadanie..."
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                />
                <button onClick={handleAdd}>+</button>
            </div>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggle(todo)}
                        />
                        {editingId === todo.id ? (
                            <input
                                type="text"
                                className="edit-input"
                                value={editingText}
                                autoFocus
                                onChange={e => setEditingText(e.target.value)}
                                onBlur={() => handleEdit(todo, editingText)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleEdit(todo, editingText);
                                    } else if (e.key === 'Escape') {
                                        setEditingId(null);
                                        setEditingText('');
                                    }
                                }}
                            />
                        ) : (
                            <span
                                className={todo.completed ? 'done' : ''}
                                onDoubleClick={() => startEditing(todo)}
                            >
                                {todo.title}
                            </span>
                        )}
                        <button onClick={() => handleDelete(todo.id)}>🗑</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
