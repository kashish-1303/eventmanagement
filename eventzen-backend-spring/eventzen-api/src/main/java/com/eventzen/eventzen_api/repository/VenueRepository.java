package com.eventzen.eventzen_api.repository;



import com.eventzen.eventzen_api.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VenueRepository extends JpaRepository<Venue, String> {
    List<Venue> findByStatus(Venue.Status status);
}
