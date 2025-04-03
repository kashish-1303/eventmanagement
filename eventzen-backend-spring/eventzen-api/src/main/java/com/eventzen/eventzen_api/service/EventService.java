package com.eventzen.eventzen_api.service;

import com.eventzen.eventzen_api.dto.CreateEventRequest;
import com.eventzen.eventzen_api.dto.EventDto;
import com.eventzen.eventzen_api.dto.UpdateEventRequest;
import com.eventzen.eventzen_api.dto.VenueDto;
import com.eventzen.eventzen_api.entity.Event;
import com.eventzen.eventzen_api.entity.Venue;
import com.eventzen.eventzen_api.exception.ResourceNotFoundException;
import com.eventzen.eventzen_api.repository.EventRepository;
import com.eventzen.eventzen_api.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final VenueRepository venueRepository;
    private final VenueService venueService;

    @Autowired
    public EventService(EventRepository eventRepository, VenueRepository venueRepository, VenueService venueService) {
        this.eventRepository = eventRepository;
        this.venueRepository = venueRepository;
        this.venueService = venueService;
    }

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EventDto getEventById(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return convertToDTO(event);
    }

    public List<EventDto> getUpcomingEvents() {
        return eventRepository.findByStartTimeAfter(LocalDateTime.now()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDto> getEventsByCategory(Event.Category category) {
        return eventRepository.findByCategory(category).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDto> getEventsByVenue(String venueId) {
        return eventRepository.findByVenueId(venueId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EventDto createEvent(CreateEventRequest request) {
        Event event = new Event();
        event.setTitle(request.getTitle());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setCategory(request.getCategory());
        
        Venue venue = venueRepository.findById(request.getVenueId())
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + request.getVenueId()));
        event.setVenue(venue);
        
        Event savedEvent = eventRepository.save(event);
        return convertToDTO(savedEvent);
    }

    public EventDto updateEvent(String id, UpdateEventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        
        event.setTitle(request.getTitle());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setCategory(request.getCategory());
        
        if (request.getVenueId() != null) {
            Venue venue = venueRepository.findById(request.getVenueId())
                    .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + request.getVenueId()));
            event.setVenue(venue);
        }
        
        Event updatedEvent = eventRepository.save(event);
        return convertToDTO(updatedEvent);
    }

    public void deleteEvent(String id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }

    public EventDto convertToDTO(Event event) {
        EventDto dto = new EventDto();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setStartTime(event.getStartTime());
        dto.setEndTime(event.getEndTime());
        dto.setCategory(event.getCategory());
        
        VenueDto venueDTO = venueService.convertToDto(event.getVenue());
        dto.setVenue(venueDTO);
        
        return dto;
    }
}
