// package com.eventzen.eventzen_api.entity;



// import jakarta.persistence.*;
// import lombok.Data;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "events")
// @Data
// public class Event {
//     @Id
//     @GeneratedValue(strategy = GenerationType.UUID)
//     private String id;
    
//     @Column(nullable = false)
//     private String title;
    
//     @Column(name = "start_time", nullable = false)
//     private LocalDateTime startTime;
    
//     @Column(name = "end_time", nullable = false)
//     private LocalDateTime endTime;
    
//     @Enumerated(EnumType.STRING)
//     @Column(nullable = false)
//     private Category category;
    
//     @ManyToOne
//     @JoinColumn(name = "venue_id", nullable = false)
//     private Venue venue;
    
//     public enum Category {
//         SOCIAL, CORPORATE, SPORTS, TECH
//     }
// }
package com.eventzen.eventzen_api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;
    
    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;
    
    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;
    
    public enum Category {
        SOCIAL, CORPORATE, SPORTS, TECH
    }
}