// eventzen-backend-spring/eventzen-api/src/main/java/com/eventzen/eventzen_api/controller/BookingController.java
package com.eventzen.eventzen_api.controller;

import com.eventzen.eventzen_api.dto.BookingStatusUpdateDto;
import com.eventzen.eventzen_api.entity.Booking;
import com.eventzen.eventzen_api.entity.User;
import com.eventzen.eventzen_api.service.BookingService;
import com.eventzen.eventzen_api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private UserService userService;
    
    @PatchMapping("/{bookingId}/status")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable String bookingId,
            @RequestBody BookingStatusUpdateDto updateDto,
            @RequestHeader("Authorization") String token) {
        
        // Validate token and get user
        User user = userService.getUserFromToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        // Update booking status in database
        Booking booking = bookingService.findByBookingId(bookingId);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }
        
        booking = bookingService.updateBookingStatus(
                bookingId, 
                updateDto.getStatus(), 
                updateDto.getPaymentId());
        
        return ResponseEntity.ok(booking);
    }
}