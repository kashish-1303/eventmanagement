// eventzen-backend-spring/eventzen-api/src/main/java/com/eventzen/eventzen_api/entity/Booking.java
package com.eventzen.eventzen_api.entity;

import java.util.Date;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String bookingId;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
    
    private String status;
    private String paymentId;
    private String paymentStatus;
    private Date createdAt;
    private Date updatedAt;
    
    // Add other necessary fields based on your booking model
}