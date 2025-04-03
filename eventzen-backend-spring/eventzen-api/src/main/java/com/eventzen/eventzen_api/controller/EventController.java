package com.eventzen.eventzen_api.controller;

import com.eventzen.eventzen_api.dto.CreateEventRequest;
import com.eventzen.eventzen_api.dto.EventDto;
import com.eventzen.eventzen_api.dto.UpdateEventRequest;
import com.eventzen.eventzen_api.entity.Event;
import com.eventzen.eventzen_api.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable String id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<EventDto>> getUpcomingEvents() {
        return ResponseEntity.ok(eventService.getUpcomingEvents());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<EventDto>> getEventsByCategory(@PathVariable Event.Category category) {
        return ResponseEntity.ok(eventService.getEventsByCategory(category));
    }

    @GetMapping("/venue/{venueId}")
    public ResponseEntity<List<EventDto>> getEventsByVenue(@PathVariable String venueId) {
        return ResponseEntity.ok(eventService.getEventsByVenue(venueId));
    }

    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody CreateEventRequest request) {
        EventDto createdEvent = eventService.createEvent(request);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@PathVariable String id, @RequestBody UpdateEventRequest request) {
        return ResponseEntity.ok(eventService.updateEvent(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}