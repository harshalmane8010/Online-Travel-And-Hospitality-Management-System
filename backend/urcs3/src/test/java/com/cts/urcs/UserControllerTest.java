package com.cts.urcs;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.cts.urcs.controller.UserController;
import com.cts.urcs.model.UserDto;
import com.cts.urcs.service.UserServiceImpl;

class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserServiceImpl userService;

    private UserDto userDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userDto = new UserDto();
        userDto.setUserId(1);
        userDto.setEmail("test@example.com");
       
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
    void testGetUserById() {
        when(userService.getUserByEmail("dev.harshal@example.com")).thenReturn(userDto);
        UserDto response = userController.getUserByEmail("dev.harshal@example.com");
        assertNotNull(response);
        assertEquals(1, response.getUserId());
    }

    @Test
    void testDeleteUserById() {
        when(userService.deleteUserById(1)).thenReturn("User deleted successfully.");
        String response = userController.deleteUserById(1);
        assertEquals("User deleted successfully.", response);
    }
    
}
