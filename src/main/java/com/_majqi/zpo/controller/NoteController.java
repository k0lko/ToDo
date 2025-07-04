package com._majqi.zpo.controller;

import com._majqi.zpo.model.Note;
import com._majqi.zpo.repository.NoteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    private final NoteRepository repo;

    public NoteController(NoteRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Note> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return repo.save(note);
    }

    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note note) {
        Optional<Note> existing = repo.findById(id);
        if (existing.isPresent()) {
            Note n = existing.get();
            n.setContent(note.getContent());
            return repo.save(n);
        } else {
            throw new RuntimeException("Note not found");
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
