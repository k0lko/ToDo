package com._majqi.zpo.service;

import com._majqi.zpo.model.Todo;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TodoService {

    private final Map<Long, Todo> todos = new LinkedHashMap<>();
    private final AtomicLong counter = new AtomicLong();

    public List<Todo> getAllTodos() {
        return new ArrayList<>(todos.values());
    }

    public Todo addTodo(String title) {
        Long id = counter.incrementAndGet();
        Todo todo = new Todo(id, title, false);
        todos.put(id, todo);
        return todo;
    }

    public Todo updateTodo(Long id, Todo updated) {
        if (todos.containsKey(id)) {
            updated.setId(id);
            todos.put(id, updated);
            return updated;
        }
        return null;
    }

    public void deleteTodo(Long id) {
        todos.remove(id);
    }
}
