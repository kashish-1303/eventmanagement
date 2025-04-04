// Create this file: eventzen-backend-spring/eventzen-api/src/main/java/com/eventzen/eventzen_api/config/DataInitializer.java

package com.eventzen.eventzen_api.config;

import com.eventzen.eventzen_api.entity.Event;
import com.eventzen.eventzen_api.entity.User;
import com.eventzen.eventzen_api.entity.Venue;
import com.eventzen.eventzen_api.repository.EventRepository;
import com.eventzen.eventzen_api.repository.UserRepository;
import com.eventzen.eventzen_api.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            VenueRepository venueRepository,
            EventRepository eventRepository,
            UserRepository userRepository,
            @Autowired PasswordEncoder passwordEncoder
    ) {
        return args -> {
            // Add venues
            Venue venue1 = new Venue();
            venue1.setName("Grand Hall");
            venue1.setCapacity(500);
            venue1.setStatus(Venue.Status.AVAILABLE);
            venue1.setPricePerHour(new BigDecimal("250.00"));
            
            Venue venue2 = new Venue();
            venue2.setName("Tech Conference Center");
            venue2.setCapacity(300);
            venue2.setStatus(Venue.Status.AVAILABLE);
            venue2.setPricePerHour(new BigDecimal("175.00"));
            
            Venue venue3 = new Venue();
            venue3.setName("Garden Pavilion");
            venue3.setCapacity(150);
            venue3.setStatus(Venue.Status.AVAILABLE);
            venue3.setPricePerHour(new BigDecimal("125.00"));
            
            Venue venue4 = new Venue();
            venue4.setName("Downtown Loft");
            venue4.setCapacity(80);
            venue4.setStatus(Venue.Status.MAINTENANCE);
            venue4.setPricePerHour(new BigDecimal("95.00"));
            
            venueRepository.saveAll(Arrays.asList(venue1, venue2, venue3, venue4));
            
            // Create a test admin user
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@eventzen.com");
            adminUser.setPasswordHash(passwordEncoder.encode("admin123"));
            adminUser.setRole(User.Role.ADMIN);
            
            // Create a test customer user
            User customerUser = new User();
            customerUser.setUsername("customer");
            customerUser.setEmail("customer@example.com");
            customerUser.setPasswordHash(passwordEncoder.encode("customer123"));
            customerUser.setRole(User.Role.CUSTOMER);
            
            userRepository.saveAll(Arrays.asList(adminUser, customerUser));
            
            // Add events
            Event event1 = new Event();
            event1.setTitle("Tech Conference 2025");
            event1.setStartTime(LocalDateTime.now().plusDays(30));
            event1.setEndTime(LocalDateTime.now().plusDays(30).plusHours(8));
            event1.setCategory(Event.Category.TECH);
            event1.setVenue(venue2);
            
            Event event2 = new Event();
            event2.setTitle("Annual Business Summit");
            event2.setStartTime(LocalDateTime.now().plusDays(45));
            event2.setEndTime(LocalDateTime.now().plusDays(46));
            event2.setCategory(Event.Category.CORPORATE);
            event2.setVenue(venue1);
            
            Event event3 = new Event();
            event3.setTitle("Spring Music Festival");
            event3.setStartTime(LocalDateTime.now().plusDays(60));
            event3.setEndTime(LocalDateTime.now().plusDays(60).plusHours(10));
            event3.setCategory(Event.Category.SOCIAL);
            event3.setVenue(venue3);
            
            Event event4 = new Event();
            event4.setTitle("Developer Workshop");
            event4.setStartTime(LocalDateTime.now().plusDays(15));
            event4.setEndTime(LocalDateTime.now().plusDays(15).plusHours(6));
            event4.setCategory(Event.Category.TECH);
            event4.setVenue(venue2);
            
            Event event5 = new Event();
            event5.setTitle("Sports Tournament");
            event5.setStartTime(LocalDateTime.now().plusDays(90));
            event5.setEndTime(LocalDateTime.now().plusDays(91));
            event5.setCategory(Event.Category.SPORTS);
            event5.setVenue(venue1);
            
            eventRepository.saveAll(Arrays.asList(event1, event2, event3, event4, event5));
        };
    }
}