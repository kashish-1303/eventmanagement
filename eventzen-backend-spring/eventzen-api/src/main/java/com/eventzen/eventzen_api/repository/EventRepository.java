package com.eventzen.eventzen_api.repository;

import com.eventzen.eventzen_api.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {
    List<Event> findByStartTimeAfter(LocalDateTime date);
    List<Event> findByCategory(Event.Category category);
    List<Event> findByVenueId(String venueId);
}
