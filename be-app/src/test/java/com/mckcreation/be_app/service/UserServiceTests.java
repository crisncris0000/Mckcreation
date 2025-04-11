package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.impl.UserServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mindrot.jbcrypt.BCrypt;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    @Mock
    UserRepository userRepository;

    @Mock
    ShippingRepository shippingRepository;

    @InjectMocks
    UserServiceImpl userService;

    @Test
    public void UserService_CreateUser_ReturnUser() {

        User user = User.builder()
                .email("sanchez@gmail.com")
                .firstName("Sanchez")
                .lastName("Santiago")
                .password("123")
                .build();

        UserDTO userDTO = UserDTO.builder()
                .email("sanchez@gmail.com")
                .firstName("Sanchez")
                .lastName("Santiago")
                .password("123")
                .build();

        when(userRepository.save(Mockito.any(User.class))).thenReturn(user);


        User savedUser = userService.createUser(userDTO);

        Assertions.assertThat(savedUser).isNotNull();
    }

    @Test
    public void UserService_GetAllUsers_ReturnUsers() {

        User user1 = User.builder()
                .email("sanchez@gmail.com")
                .firstName("Sanchez")
                .lastName("Santiago")
                .password("123")
                .build();

        User user2 = User.builder()
                .email("chris@gmail.com")
                .firstName("Chris")
                .lastName("Rivera")
                .password("1234")
                .build();

        List<User> userList = Arrays.asList(user1, user2);

        when(userRepository.findAll()).thenReturn(userList);

        List<User> users = userService.getAllUsers();

        Assertions.assertThat(users).isNotNull();
        Assertions.assertThat(users.size()).isEqualTo(2);
        Assertions.assertThat(users.get(0).getEmail()).isEqualTo("sanchez@gmail.com");
    }

    @Test
    public void UserService_GetUserByID_ReturnUser() {
        User user = User.builder()
                .email("sanchez@gmail.com")
                .firstName("Sanchez")
                .lastName("Santiago")
                .password("123")
                .build();


        when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));

        User savedUser = userService.getUserByID(1);

        Assertions.assertThat(savedUser).isNotNull();
    }

    @Test
    public void UserService_UpdateUserInfo_ReturnUser() throws Exception {
        User user = User.builder()
                .email("sanchez@gmail.com")
                .firstName("Sanchez")
                .lastName("Santiago")
                .password(BCrypt.hashpw("123", BCrypt.gensalt()))
                .build();

        UserDTO userDTO = UserDTO.builder()
                .email("sanchez@gmail.com")
                .firstName("Sanchez")
                .lastName("Santiago")
                .oldPassword("123")
                .password("password")
                .build();

        Shipping shipping = Shipping.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(11111)
                .user(user)
                .build();

        when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        when(shippingRepository.getUserShipping(Mockito.anyLong())).thenReturn(Optional.ofNullable(shipping));
        when(shippingRepository.save(Mockito.any(Shipping.class))).thenReturn(shipping);

        User savedUser = userService.updateUserInfo(1, userDTO);

        System.out.println();
        Assertions.assertThat(savedUser).isNotNull();
        Assertions.assertThat(BCrypt.checkpw(userDTO.getPassword(), savedUser.getPassword())).isTrue();
    }

    @Test
    public void UserService_UserExists_ReturnTrue() {
        User user = User.builder()
                .email("sanchez@gmail.com")
                .firstName("Sanchez")
                .lastName("Santiago")
                .password(BCrypt.hashpw("123", BCrypt.gensalt()))
                .build();

        when(userRepository.findUserByEmail("sanchez@gmail.com")).thenReturn(Optional.ofNullable(user));

        boolean exists = userService.userExists("sanchez@gmail.com");

        Assertions.assertThat(exists).isTrue();
    }

}
