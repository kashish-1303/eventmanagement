
// // package com.eventzen.eventzen_api.entity;

// // import jakarta.persistence.*;
// // import lombok.Data;
// // import java.time.LocalDateTime;

// // @Entity
// // @Table(name = "events")
// // @Data
// // public class Event {
// //     @Id
// //     @GeneratedValue(strategy = GenerationType.UUID)
// //     private String id;
    
// //     @Column(nullable = false)
// //     private String title;
    
// //     @Column(name = "start_time", nullable = false)
// //     private LocalDateTime startTime;
    
// //     @Column(name = "end_time", nullable = false)
// //     private LocalDateTime endTime;
    
// //     @Enumerated(EnumType.STRING)
// //     @Column(nullable = false)
// //     private Category category;
    
// //     @ManyToOne
// //     @JoinColumn(name = "venue_id", nullable = false)
// //     private Venue venue;
    
// //     public enum Category {
// //         SOCIAL, CORPORATE, SPORTS, TECH
// //     }
// // }
// package com.eventzen.eventzen_api.entity;

// import jakarta.persistence.*;
// import lombok.Data;

// import java.time.LocalDateTime;
// import java.util.UUID;

// @Entity
// @Table(name = "events")
// @Data
// public class Event {
//     @Id
//     @GeneratedValue(strategy = GenerationType.UUID)
//     private UUID id;
    
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
    
//     @ManyToOne
//     @JoinColumn(name = "user_id", nullable = false)
//     private User user;
    
//     public enum Category {
//         SOCIAL, CORPORATE, SPORTS, TECH
//     }
// }
package com.eventzen.eventzen_api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import java.sql.Types;

@Entity
@Table(name = "events")
@Data
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "varchar(36)")
    @JdbcTypeCode(Types.VARCHAR)  // Ensures the UUID is stored as a 36-character string
    private UUID id;
    
    // other fields, for example:
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
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;
    
    public enum Category {
        SOCIAL, CORPORATE, SPORTS, TECH
    }
}
