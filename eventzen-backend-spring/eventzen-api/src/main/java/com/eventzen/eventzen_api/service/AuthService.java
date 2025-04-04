package com.eventzen.eventzen_api.service;


import com.eventzen.eventzen_api.dto.AuthRequest;
import com.eventzen.eventzen_api.dto.AuthResponse;
import com.eventzen.eventzen_api.dto.RegisterRequest;
import com.eventzen.eventzen_api.dto.UserDto;
import com.eventzen.eventzen_api.entity.User;
import com.eventzen.eventzen_api.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
@Service
@Transactional
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    // public AuthResponse login(AuthRequest loginRequest) {
    //     Authentication authentication = authenticationManager.authenticate(
    //             new UsernamePasswordAuthenticationToken(
    //                     loginRequest.getEmail(),
    //                     loginRequest.getPassword()
    //             )
    //     );

    //     SecurityContextHolder.getContext().setAuthentication(authentication);
    //     String jwt = tokenProvider.generateToken(authentication);
        
    //     UserDto user = userService.getUserByEmail(loginRequest.getEmail())
    //             .orElseThrow(() -> new RuntimeException("User not found"));
        
    //     return new AuthResponse(jwt, user);
    // }
    public AuthResponse login(AuthRequest loginRequest) {
        try {
            System.out.println("Login attempt for: " + loginRequest.getEmail());
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
            System.out.println("Authentication successful");
    
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            System.out.println("JWT token generated");
            
            UserDto user = userService.getUserByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            return new AuthResponse(jwt, user);
        } catch (Exception e) {
            System.out.println("Login error: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public UserDto register(RegisterRequest signUpRequest) {
        try {
            // More specific exception types
            if (userService.existsByUsername(signUpRequest.getUsername())) {
                throw new IllegalArgumentException("Username is already taken");
            }
            if (userService.existsByEmail(signUpRequest.getEmail())) {
                throw new IllegalArgumentException("Email is already in use");
            }

            return userService.createUser(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword(),
                User.Role.CUSTOMER
            );
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Database constraint violation: " + 
                e.getMostSpecificCause().getMessage());
        }
    }
}
