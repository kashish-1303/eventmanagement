// package com.eventzen.eventzen_api.security;


// import com.eventzen.eventzen_api.entity.User;
// import com.eventzen.eventzen_api.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import java.util.Collections;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {

//     @Autowired
//     private UserRepository userRepository;

//     @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         User user = userRepository.findByEmail(email)
//                 .orElseThrow(() -> 
//                     new UsernameNotFoundException("User not found with email: " + email)
//                 );
        
//         return new org.springframework.security.core.userdetails.User(
//                 user.getEmail(),
//                 user.getPasswordHash(),
//                 Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
//         );
//     }
// }
package com.eventzen.eventzen_api.security;

import com.eventzen.eventzen_api.entity.User;
import com.eventzen.eventzen_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            System.out.println("Loading user by email: " + email);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> 
                        new UsernameNotFoundException("User not found with email: " + email)
                    );
            
            System.out.println("User found: " + user.getUsername() + ", Role: " + user.getRole());
            
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPasswordHash(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
            );
        } catch (Exception e) {
            System.out.println("Error loading user: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}