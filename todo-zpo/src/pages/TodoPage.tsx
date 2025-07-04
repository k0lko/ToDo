import { useEffect, useState } from "react";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/todos")
            .then((res) => res.json())
            .then(setTodos);
    }, []);

    const addTodo = () => {
        fetch("http://localhost:8080/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTodo }),
        })
            .then((res) => res.json())
            .then((newItem) => {
                setTodos([...todos, newItem]);
                setNewTodo("");
            });
    };

    const updateTodo = (id: number, updates: Partial<Todo>) => {
        fetch(`http://localhost:8080/api/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        }).then(() =>
            setTodos(todos.map((t) => (t.id === id ? { ...t, ...updates } : t)))
        );
    };

    const deleteTodo = (id: number) => {
        fetch(`http://localhost:8080/api/todos/${id}`, { method: "DELETE" }).then(() =>
            setTodos(todos.filter((t) => t.id !== id))
        );
    };

    return (
        <div>
            <h1>📋 Lista Zadań</h1>
            <div className="add-task">
                <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Nowe zadanie..."
                />
                <button onClick={addTodo}>➕</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li className="todo-item" key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
                        />
                        <span className={todo.completed ? "done" : ""}>{todo.title}</span>
                        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
