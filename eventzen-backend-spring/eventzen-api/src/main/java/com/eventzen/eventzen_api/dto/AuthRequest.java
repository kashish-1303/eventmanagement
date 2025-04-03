package com.eventzen.eventzen_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Must be a valid email id")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
    
}
