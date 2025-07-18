package com._majqi.zpo.controller;

import com._majqi.zpo.model.Note;
import com._majqi.zpo.repository.NoteRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    private final NoteRepository repo;

    public NoteController(NoteRepository repo) {
        this.repo = repo;
    }

    @Async
    @GetMapping
    public CompletableFuture<List<Note>> getAll() {
        return CompletableFuture.supplyAsync(repo::findAll);
    }

    @Async
    @PostMapping
    public CompletableFuture<Note> create(@RequestBody Note note) {
        return CompletableFuture.supplyAsync(() -> repo.save(note));
    }

    @Async
    @PutMapping("/{id}")
    public CompletableFuture<Note> update(@PathVariable Long id, @RequestBody Note note) {
        return CompletableFuture.supplyAsync(() -> {
            Optional<Note> existing = repo.findById(id);
            if (existing.isPresent()) {
                Note n = existing.get();
                n.setContent(note.getContent());
                return repo.save(n);
            } else {
                throw new RuntimeException("Note not found");
            }
        });
    }

    @Async
    @DeleteMapping("/{id}")
    public CompletableFuture<Void> delete(@PathVariable Long id) {
        return CompletableFuture.runAsync(() -> repo.deleteById(id));
    }
}
