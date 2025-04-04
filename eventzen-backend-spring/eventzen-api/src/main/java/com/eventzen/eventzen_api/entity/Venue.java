// package com.eventzen.eventzen_api.entity;



// import jakarta.persistence.*;
// import lombok.Data;
// import java.math.BigDecimal;
// import java.util.UUID;
// @Entity
// @Table(name = "venues")
// @Data
// public class Venue {
//     @Id
//     @GeneratedValue(strategy = GenerationType.UUID)
//     private UUID id;
    
//     @Column(nullable = false)
//     private String name;
    
//     @Column(nullable = false)
//     private Integer capacity;
    
//     @Enumerated(EnumType.STRING)
//     @Column(nullable = false)
//     private Status status;
    
//     @Column(name = "price_per_hour", nullable = false, precision = 10, scale = 2)
//     private BigDecimal pricePerHour;
    
//     public enum Status {
//         AVAILABLE, MAINTENANCE
//     }
// }
package com.eventzen.eventzen_api.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.sql.Types;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;

@Entity
@Table(name = "venues")
@Data
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "varchar(36)")
    @JdbcTypeCode(Types.VARCHAR) // Converts UUID to String when persisting
    private UUID id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Integer capacity;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
    
    @Column(name = "price_per_hour", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerHour;
    
    public enum Status {
        AVAILABLE, MAINTENANCE
    }
}
