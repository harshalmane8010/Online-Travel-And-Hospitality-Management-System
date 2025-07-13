package com.cts.urcs.service;

import java.util.List;
import com.cts.urcs.entity.User;
import com.cts.urcs.model.UserDto;

public interface UserService {
    UserDto addUser(UserDto userDto);
    UserDto getUserById(int userId);
    List<UserDto> getAllUsers();
    UserDto getUserByEmail(String email);
    UserDto updateUser(String email, UserDto updatedUser);
    String deleteUserById(int userId);

    // ✅ Add this method
    User getUserEntityByEmail(String email);
}
