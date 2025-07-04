import { useEffect, useState } from 'react';
import './TodoPage.css';

interface Todo {
    id: string;
    text: string;
    done: boolean;
}

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('todos');
        if (saved) setTodos(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (!newTodo.trim()) return;
        const todo: Todo = { id: Date.now().toString(), text: newTodo.trim(), done: false };
        setTodos([todo, ...todos]);
        setNewTodo('');
    };

    const toggleDone = (id: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState('');

    const startEditing = (id: string, text: string) => {
        setEditingId(id);
        setEditingText(text);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingText('');
    };

    const saveEditing = (id: string) => {
        if (!editingText.trim()) return;
        setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editingText.trim() } : todo));
        cancelEditing();
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
                    onKeyDown={e => e.key === 'Enter' && addTodo()}
                />
                <button onClick={addTodo}>+</button>
            </div>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => toggleDone(todo.id)}
                        />
                        {editingId === todo.id ? (
                            <>
                                <input
                                    className="edit-input"
                                    type="text"
                                    value={editingText}
                                    onChange={e => setEditingText(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && saveEditing(todo.id)}
                                />
                                <button className="save-btn" onClick={() => saveEditing(todo.id)}>💾</button>
                                <button className="cancel-btn" onClick={cancelEditing}>❌</button>
                            </>
                        ) : (
                            <>
                <span
                    className={todo.done ? 'done' : ''}
                    onDoubleClick={() => startEditing(todo.id, todo.text)}
                >
                  {todo.text}
                </span>
                                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>🗑</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
