package com.mckcreation.be_app.Service;

import com.mckcreation.be_app.Model.User;
import com.mckcreation.be_app.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserByID(int id) {
        Optional<User> user = userRepository.findById(id);

        return user.orElseThrow(() ->
                new EntityNotFoundException("User not found by id: " + id));
    }

    public User findUserByEmail(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);

        return user.orElseThrow(() ->
                new EntityNotFoundException("User not found by email: " + email));
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public boolean userExists(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.isPresent();
    }
}
