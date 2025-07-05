package com.cts.urcs.service;

import java.util.List;

import com.cts.urcs.model.UserDto;

public interface UserService {
	public UserDto addUser(UserDto userDto);
	public UserDto getUserById(int userId);
	List<UserDto> getAllUsers();
	public UserDto getUserByEmail(String email);
	public UserDto updateUser(String email, UserDto updatedUser);
	public String deleteUserById(int userId);

}
