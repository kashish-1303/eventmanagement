package com.eventzen.eventzen_api.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data

public class RegisterRequest {
    @NotBlank(message = "Username is required")
    @Size(min = 4, max=50, message = "Username must be between 4-50 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Must be a valid email")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be between 6 characters")
    private String password;

    
}
