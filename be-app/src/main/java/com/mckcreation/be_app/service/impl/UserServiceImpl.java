package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.dto.UserShippingDTO;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    ShippingRepository shippingRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ShippingRepository shippingRepository) {
        this.userRepository = userRepository;
        this.shippingRepository = shippingRepository;
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

    public User getUserByID(int id) {
        Optional<User> user = userRepository.findById(id);

        return user.orElseThrow(() ->
                new EntityNotFoundException("User not found by id: " + id));
    }

    public User getUserByEmail(String email) {
        
        Optional<User> user = userRepository.findUserByEmail(email.toLowerCase());

        return user.orElseThrow(() ->
                new EntityNotFoundException("User not found by email: " + email));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getRecentUsers(int num) {
        List<User> users = userRepository.getRecentUsers(PageRequest.of(0, num));

        if (users.isEmpty()) {
            throw new EntityNotFoundException("Users not able to be retrieved");
        }

        return users;
    }

    @Override
    public UserShippingDTO getUserAndShipping(int userID) {
        return userRepository.getUserAndShipping(userID).orElseThrow(() ->
                new EntityNotFoundException("Cannot find required information"));
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

        User user = optionalUser.orElseThrow(() ->
                new EntityNotFoundException("User not found"));


        if(userDTO.getOldPassword() != null && !userDTO.getOldPassword().isEmpty()) {

            String oldPassword = userDTO.getOldPassword();

            boolean matches = BCrypt.checkpw(oldPassword, user.getPassword());

            if (!matches) {
                throw new Exception("Current password doesn't match");
            }

            String hashedPassword = BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt());

            user.setPassword(hashedPassword);
        }


        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        Optional<Shipping> optionalShipping = shippingRepository.getUserShipping(user.getId());

        Shipping shipping = optionalShipping.orElseThrow(() ->
                new EntityNotFoundException("Shipping info not found"));


        user.setUpdatedAt(timestamp);

        shipping.setAddress(userDTO.getAddress());
        shipping.setState(userDTO.getState());
        shipping.setCity(userDTO.getCity());
        shipping.setZipCode(userDTO.getZipCode());

        shippingRepository.save(shipping);

        return userRepository.save(user);
    }

    @Override
    public void updateUserPassword(UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findUserByEmail(userDTO.getEmail().toLowerCase());

        User user = optionalUser.orElseThrow(() -> new EntityNotFoundException("User not found"));

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        String hashedPassword = BCrypt.hashpw(userDTO.getPassword(), BCrypt.gensalt());

        user.setPassword(hashedPassword);
        user.setUpdatedAt(timestamp);

        userRepository.save(user);
    }

    public boolean userExists(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.isPresent();
    }
}
