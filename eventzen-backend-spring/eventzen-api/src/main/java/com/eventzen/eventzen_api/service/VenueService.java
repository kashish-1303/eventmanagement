package com.eventzen.eventzen_api.service;



import com.eventzen.eventzen_api.dto.VenueDto;
import com.eventzen.eventzen_api.dto.VenueRequest;
import com.eventzen.eventzen_api.entity.Venue;
import com.eventzen.eventzen_api.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public List<VenueDto> getAllVenues() {
        return venueRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<VenueDto> getAvailableVenues() {
        return venueRepository.findByStatus(Venue.Status.AVAILABLE).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<VenueDto> getVenueById(String id) {
        return venueRepository.findById(id)
                .map(this::convertToDto);
    }

    public VenueDto createVenue(VenueRequest venueRequest) {
        Venue venue = new Venue();
        updateVenueFromRequest(venue, venueRequest);
        Venue savedVenue = venueRepository.save(venue);
        return convertToDto(savedVenue);
    }

    public Optional<VenueDto> updateVenue(String id, VenueRequest venueRequest) {
        return venueRepository.findById(id)
                .map(venue -> {
                    updateVenueFromRequest(venue, venueRequest);
                    return convertToDto(venueRepository.save(venue));
                });
    }

    public boolean deleteVenue(String id) {
        if (venueRepository.existsById(id)) {
            venueRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private void updateVenueFromRequest(Venue venue, VenueRequest request) {
        venue.setName(request.getName());
        venue.setCapacity(request.getCapacity());
        venue.setStatus(Venue.Status.valueOf(request.getStatus()));
        venue.setPricePerHour(request.getPricePerHour());
    }

    public VenueDto convertToDto(Venue venue) {
        VenueDto dto = new VenueDto();
        dto.setId(venue.getId().toString());
        dto.setName(venue.getName());
        dto.setCapacity(venue.getCapacity());
        dto.setStatus(venue.getStatus().name());
        dto.setPricePerHour(venue.getPricePerHour());
        return dto;
    }
}