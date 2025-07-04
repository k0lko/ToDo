package com._majqi.zpo.repository;

import com._majqi.zpo.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
