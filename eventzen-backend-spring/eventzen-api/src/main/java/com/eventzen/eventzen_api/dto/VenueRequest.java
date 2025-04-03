package com.eventzen.eventzen_api.dto;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class VenueRequest {
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;
    
    @NotNull(message = "Status is required")
    private String status;
    
    @NotNull(message = "Price per hour is required")
    @Positive(message = "Price per hour must be positive")
    private BigDecimal pricePerHour;
}
