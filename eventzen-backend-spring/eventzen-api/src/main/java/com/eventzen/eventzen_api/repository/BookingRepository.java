// eventzen-backend-spring/eventzen-api/src/main/java/com/eventzen/eventzen_api/repository/BookingRepository.java
package com.eventzen.eventzen_api.repository;

import com.eventzen.eventzen_api.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Booking findByBookingId(String bookingId);
}