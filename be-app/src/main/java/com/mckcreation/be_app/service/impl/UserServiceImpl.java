package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.exception.PasswordsNotMachException;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByID(int id) {
        Optional<User> user = userRepository.findById(id);

        return user.orElseThrow(() ->
                new EntityNotFoundException("User not found by id: " + id));
    }

    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);

        return user.orElseThrow(() ->
                new EntityNotFoundException("User not found by email: " + email));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(UserDTO userDTO) {

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        String hashed = BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt());

        String email = userDTO.getEmail().toLowerCase();

        User user = User.builder()
                        .firstName(userDTO.getFirstName())
                        .lastName(userDTO.getLastName())
                        .email(email)
                        .password(hashed)
                        .role("USER")
                        .createdAt(timestamp)
                        .updatedAt(timestamp)
                        .build();

       return userRepository.save(user);
    }

    @Override
    public User updateUser(long id, UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findById((int) id);

        User user = optionalUser.orElseThrow(() -> new EntityNotFoundException("User not found"));

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setRole("USER");
        user.setUpdatedAt(timestamp);

        return userRepository.save(user);
    }

    @Override
    public User updateUserPassword(long id, UserDTO userDTO) throws Exception {
        Optional<User> optionalUser = userRepository.findById((int) id);

        User user = optionalUser.orElseThrow(() -> new EntityNotFoundException("User not found"));

        boolean matches = BCrypt.checkpw(userDTO.getOldPassword(), user.getPassword());

        if(!matches) {
            throw new PasswordsNotMachException("User password does not match");
        }

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        String hashedPassword = BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt());

        user.setPassword(hashedPassword);
        user.setUpdatedAt(timestamp);

        return userRepository.save(user);
    }

    public boolean userExists(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.isPresent();
    }
}
