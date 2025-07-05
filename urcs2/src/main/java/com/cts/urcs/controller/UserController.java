package com.cts.urcs.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.cts.urcs.appconfig.JwtUtility;
import com.cts.urcs.model.LoginDto;
import com.cts.urcs.model.UserDto;
import com.cts.urcs.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user-api")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtility jwtUtility;

    @PostMapping("/users")
    public UserDto addUser(@RequestBody UserDto userDto) {
        return userService.addUser(userDto);
    }

    @GetMapping("/users/id/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto getUserById(@PathVariable int userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/users/email/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }
    
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/users/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto updateUser(@PathVariable String email, @RequestBody UserDto updatedUser) {
        return userService.updateUser(email, updatedUser);
    }

    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUserById(@PathVariable int userId) {
        return userService.deleteUserById(userId);
    }
    
    @PostMapping("/users/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDto login) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));

            String token = jwtUtility.generateToken(login.getUsername());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("message", "Login successful");

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid username or password"); // Handled globally
        }
    }
}
