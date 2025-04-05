package com.eventzen.eventzen_api.service;

import com.eventzen.eventzen_api.security.JwtTokenProvider;

import com.eventzen.eventzen_api.dto.UserDto;
import com.eventzen.eventzen_api.entity.User;
import com.eventzen.eventzen_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    // In eventzen-backend-spring/eventzen-api/src/main/java/com/eventzen/eventzen_api/service/UserService.java
public User getUserFromToken(String token) {
    // Clean the token (remove "Bearer " prefix if present)
    if (token.startsWith("Bearer ")) {
        token = token.substring(7);
    }
    
    // Get username from token
    String username = jwtTokenProvider.getUsernameFromToken(token);
    if (username == null) {
        return null;
    }
    
    // Find and return the user
    return userRepository.findByUsername(username).orElse(null);
}

    public UserDto createUser(String username, String email, String password, User.Role role) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setRole(role);
        
        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<UserDto> getUserById(String id) {
        return userRepository.findById(id)
                .map(this::convertToDto);
    }

    public Optional<UserDto> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::convertToDto);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        return dto;
    }
}
