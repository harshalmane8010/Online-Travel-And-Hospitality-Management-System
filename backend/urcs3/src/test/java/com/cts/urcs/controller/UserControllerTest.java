package com.cts.urcs.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import com.cts.urcs.controller.UserController;
import com.cts.urcs.model.UserDto;
import com.cts.urcs.service.UserService;

class UserControllerTest {

    @Mock
    private UserService userService;
    @InjectMocks
    private UserController userController;
    
    private UserDto userDto;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userDto = new UserDto();
        userDto.setUserId(1);
        userDto.setEmail("test@example.com");
        userDto.setPhone("9876543210");
    }

    @Test
    void testAddUser() {
        when(userService.addUser(any(UserDto.class))).thenReturn(userDto);
        UserDto response = userController.addUser(userDto);
        assertNotNull(response);
        assertEquals("test@example.com", response.getEmail());
    }

    @Test
    void testGetUserByEmail() {
        when(userService.getUserByEmail("test@example.com")).thenReturn(userDto);
        UserDto response = userController.getUserByEmail("test@example.com");
        assertNotNull(response);
        assertEquals(1, response.getUserId());
    }

    @Test
    void testDeleteUserById() {
        when(userService.deleteUserById(1)).thenReturn("User deleted successfully.");
        String response = userController.deleteUserById(1);
        assertEquals("User deleted successfully.", response);
    }

    @Test
    void testUpdateUser() {
        when(userService.updateUser(eq("test@example.com"), any(UserDto.class))).thenReturn(userDto);
        UserDto response = userController.updateUser("test@example.com", userDto);
        assertEquals("test@example.com", response.getEmail());
    }
}
