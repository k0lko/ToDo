import type { Todo } from '../types';

interface Props {
    todo: Todo;
    onToggle: (todo: Todo) => void;
    onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
    return (
        <li className="todo-item">
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle({ ...todo, completed: !todo.completed })}
                />
                <span className={todo.completed ? 'done' : ''}>{todo.title}</span>
            </label>
            <button onClick={() => onDelete(todo.id)}>Usuń</button>
        </li>
    );
}
