package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTests {

    UserRepository userRepository;

    @Autowired
    public UserRepositoryTests(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Test
    public void UserRepository_FindUserByEmail_ShouldReturnUser() {
        String email = "christopherrivera384@gmail.com";

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        User savedUser = User.builder()
                .email(email)
                .firstName("Christopher")
                .lastName("Rivera")
                .password("123")
                .isAdmin(false)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        User user = userRepository.save(savedUser);

        Assertions.assertThat(user).isNotNull();
        Assertions.assertThat(user.getEmail()).isEqualTo(email);
    }

    @Test
    public void UserRepository_UpdateUser_ShouldReturnUpdatedUser() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        User savedUser = User.builder()
                .email("christopherrivera384@gmail.com")
                .firstName("Christopher")
                .lastName("Rivera")
                .password("123")
                .isAdmin(false)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        User user = userRepository.save(savedUser);


        user.setEmail("christopherrivera134@gmail.com");
        user.setPassword("1234");

        User updatedUser = userRepository.save(user);

        Assertions.assertThat(updatedUser.getEmail()).isEqualTo("christopherrivera134@gmail.com");
        Assertions.assertThat(updatedUser.getEmail()).isNotEqualTo("christopherrivera384@gmail.com");

    }

    @Test
    public void UserRepository_DeleteUser_ShouldReturnEmptyUser() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        User savedUser = User.builder()
                .email("christopherrivera384@gmail.com")
                .firstName("Christopher")
                .lastName("Rivera")
                .password("123")
                .isAdmin(false)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        userRepository.save(savedUser);
        userRepository.delete(savedUser);

        Optional<User> optionalUser = userRepository.findById(savedUser.getId());

        Assertions.assertThat(optionalUser).isEmpty();

    }
}
