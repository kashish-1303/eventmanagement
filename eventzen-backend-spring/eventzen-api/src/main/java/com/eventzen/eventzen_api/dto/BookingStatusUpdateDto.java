// eventzen-backend-spring/eventzen-api/src/main/java/com/eventzen/eventzen_api/dto/BookingStatusUpdateDto.java
package com.eventzen.eventzen_api.dto;

import lombok.Data;

@Data
public class BookingStatusUpdateDto {
    private String status;
    private String paymentId;
    
    // Include default constructor
    public BookingStatusUpdateDto() {}
    
    // Include all-args constructor
    public BookingStatusUpdateDto(String status, String paymentId) {
        this.status = status;
        this.paymentId = paymentId;
    }
    
    // Getters and setters
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getPaymentId() {
        return paymentId;
    }
    
    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
}