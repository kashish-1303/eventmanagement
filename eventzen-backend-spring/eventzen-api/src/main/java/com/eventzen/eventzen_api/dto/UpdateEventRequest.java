package com.eventzen.eventzen_api.dto;

import com.eventzen.eventzen_api.entity.Event;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateEventRequest {
    private String title;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Event.Category category;
    private String venueId;
}
