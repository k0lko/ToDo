package com._majqi.zpo.service;

import com._majqi.zpo.model.Todo;
import com._majqi.zpo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo existing = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found with id: " + id));

        existing.setTitle(updatedTodo.getTitle());
        existing.setCompleted(updatedTodo.isCompleted());

        return todoRepository.save(existing);
    }

    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new IllegalArgumentException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }
}
