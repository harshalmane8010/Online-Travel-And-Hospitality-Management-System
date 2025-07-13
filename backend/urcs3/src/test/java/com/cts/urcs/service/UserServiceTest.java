package com.cts.urcs.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cts.urcs.entity.Roles;
import com.cts.urcs.entity.User;
import com.cts.urcs.exception.UserIdIsNotFoundException;
import com.cts.urcs.model.UserDto;
import com.cts.urcs.repository.UserRepository;
import com.cts.urcs.service.UserServiceImpl;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private UserServiceImpl userService;

    private UserDto userDto;
    private User user;

    @BeforeEach
    void setUp() {
        List<Roles> roles = new ArrayList<>();
        roles.add(new Roles(1, "USER"));

        userDto = new UserDto(1, "Demo","rawPass", "9876543210", "test@example.com", roles);
        user = new User(1, "Demo","encodedPass", "9876543210", "test@example.com", roles);
    }

    @Test
    void testAddUser() {
        when(modelMapper.map(userDto, User.class)).thenReturn(user);
         when(userRepository.save(any(User.class))).thenReturn(user);
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDto);

        UserDto result = userService.addUser(userDto);
        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    void testGetUserByEmailSuccess() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDto);

        UserDto result = userService.getUserByEmail("test@example.com");
        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    void testGetUserByEmailNotFound() {
        when(userRepository.findByEmail("absent@example.com")).thenReturn(null);

        assertThrows(UserIdIsNotFoundException.class, () -> {
            userService.getUserByEmail("absent@example.com");
        });
    }

    @Test
    void testDeleteUserByIdSuccess() {
        when(userRepository.existsById(1)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1);

        String response = userService.deleteUserById(1);
        assertEquals("User with ID 1 deleted successfully", response);
    }

    @Test
    void testDeleteUserByIdFailure() {
        when(userRepository.existsById(1)).thenReturn(false);

        assertThrows(UserIdIsNotFoundException.class, () -> {
            userService.deleteUserById(1);
        });
    }

    @Test
    void testUpdateUser() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        when(passwordEncoder.encode("rawPass")).thenReturn("encodedPass");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(modelMapper.map(user, UserDto.class)).thenReturn(userDto);

        UserDto updated = userService.updateUser("test@example.com", userDto);
        assertEquals("test@example.com", updated.getEmail());
    }
}
