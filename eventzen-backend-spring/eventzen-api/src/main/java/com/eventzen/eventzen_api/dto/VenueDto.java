package com.eventzen.eventzen_api.dto;


import lombok.Data;
import java.math.BigDecimal;

@Data
public class VenueDto {
    private String id;
    private String name;
    private Integer capacity;
    private String status;
    private BigDecimal pricePerHour;
}
