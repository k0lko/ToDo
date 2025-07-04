package com._majqi.zpo.repository;

import com._majqi.zpo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
