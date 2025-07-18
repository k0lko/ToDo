package com._majqi.zpo.controller;

import com._majqi.zpo.model.Todo;
import com._majqi.zpo.service.TodoService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoService todoService;
    private final SimpMessagingTemplate messagingTemplate;

    public TodoController(TodoService todoService, SimpMessagingTemplate messagingTemplate) {
        this.todoService = todoService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping
    public List<Todo> getAll() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public Todo add(@RequestBody Todo todo) {
        Todo saved = todoService.addTodo(todo.getTitle());
        messagingTemplate.convertAndSend("/topic/todos", saved);
        return saved;
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todo) {
        Todo updated = todoService.updateTodo(id, todo);
        messagingTemplate.convertAndSend("/topic/todos", updated);
        return updated;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        todoService.deleteTodo(id);
        messagingTemplate.convertAndSend("/topic/todos/deleted", id);
    }
}
