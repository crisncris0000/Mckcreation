package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.model.User;

import java.util.List;


public interface UserService {

    User getUserByID(int id);

    User getUserByEmail(String email);

    List<User> getAllUsers();

    void saveUser(UserDTO userDTO);

    void updateUser(int id, UserDTO userDTO);

    void updateUserPassword(int id, UserDTO userDTO) throws Exception;

    boolean userExists(String email);
}
