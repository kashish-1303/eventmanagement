// eventzen-backend-spring/eventzen-api/src/main/java/com/eventzen/eventzen_api/service/BookingService.java
package com.eventzen.eventzen_api.service;

import com.eventzen.eventzen_api.entity.Booking;
import com.eventzen.eventzen_api.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public Booking findByBookingId(String bookingId) {
        return bookingRepository.findByBookingId(bookingId);
    }
    
    public Booking updateBookingStatus(String bookingId, String status, String paymentId) {
        Booking booking = bookingRepository.findByBookingId(bookingId);
        if (booking != null) {
            booking.setStatus(status);
            booking.setPaymentId(paymentId);
            booking.setPaymentStatus("PAID");
            booking.setUpdatedAt(new Date());
            return bookingRepository.save(booking);
        }
        return null;
    }
}
