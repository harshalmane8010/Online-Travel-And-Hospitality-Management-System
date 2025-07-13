package com.cts.urcs.model;

import java.util.List;

import com.cts.urcs.entity.Roles;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	private int userId;
	private String name;
	private String password;
	private String phone;
	private String email;
	private List<Roles> roles;

}
