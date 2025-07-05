package com.cts.urcs.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.urcs.entity.User;
import com.cts.urcs.exception.UserIdIsNotFoundException;
import com.cts.urcs.model.UserDto;
import com.cts.urcs.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired 
	private PasswordEncoder passwordEncoder;
	 
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDto addUser(UserDto userDto) {
		// repository save(UserEntity)
		System.out.println(userDto);
		userDto.setPassword(userDto.getPassword());
		User user = modelMapper.map(userDto, User.class);
		System.out.println(user);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User user1=userRepository.save(user);
		return modelMapper.map(user1, UserDto.class);
	}
	@Override
	public UserDto getUserById(int userId) {
	    User user = userRepository.findById(userId)
	                  .orElseThrow(() -> new UserIdIsNotFoundException("User ID " + userId + " not found"));
	    return modelMapper.map(user, UserDto.class);
	}
	
	 @Override
	    public List<UserDto> getAllUsers() {
	        List<User> users = userRepository.findAll();
	        return users.stream()
	                    .map(user -> modelMapper.map(user, UserDto.class))
	                    .collect(Collectors.toList());
	    }

	@Override
	public UserDto getUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		if(user!=null) {
			return modelMapper.map(user, UserDto.class);
		}
		throw new UserIdIsNotFoundException("user is not found");
			
	}
	@Override
	public UserDto updateUser(String email, UserDto updatedUser) {
	    User existingUser = userRepository.findByEmail(email);
	    if (existingUser == null) {
	        throw new UserIdIsNotFoundException("User with email " + email + " not found");
	    }

	    existingUser.setPhone(updatedUser.getPhone());
	    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
	    existingUser.setRoles(updatedUser.getRoles());

	    User savedUser = userRepository.save(existingUser);
	    return modelMapper.map(savedUser, UserDto.class);
	}

	@Override
	public String deleteUserById(int userId) {
	    boolean exists = userRepository.existsById(userId);
	    if (!exists) {
	        throw new UserIdIsNotFoundException("User ID " + userId + " not found");
	    }
	    userRepository.deleteById(userId);
	    return "User with ID " + userId + " deleted successfully";
	}
	
	
	 


}

