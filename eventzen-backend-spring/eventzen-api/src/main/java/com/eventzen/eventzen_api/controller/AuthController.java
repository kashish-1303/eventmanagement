package com.eventzen.eventzen_api.controller;



import com.eventzen.eventzen_api.dto.AuthRequest;
import com.eventzen.eventzen_api.dto.AuthResponse;
import com.eventzen.eventzen_api.dto.RegisterRequest;
import com.eventzen.eventzen_api.dto.UserDto;
import com.eventzen.eventzen_api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody RegisterRequest signUpRequest) {
        UserDto user = authService.register(signUpRequest);
        return ResponseEntity.ok(user);
    }
}