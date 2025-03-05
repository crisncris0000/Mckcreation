package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.model.User;

import java.util.List;


public interface UserService {

    User getUserByID(int id);

    User getUserByEmail(String email);

    List<User> getAllUsers();

    List<User> getRecentUsers(int num);

    User createUser(UserDTO userDTO);

    User updateUser(long id, UserDTO userDTO);

    User updateUserPassword(long id, UserDTO userDTO) throws Exception;

    void updateUserPassword(UserDTO userDTO);

    boolean userExists(String email);
}
