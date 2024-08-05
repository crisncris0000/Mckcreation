package com.mckcreation.be_app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.service.UserService;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(controllers = UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class UserControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDTO userDTO;

    private User user;

    @BeforeEach
    public void init() {
         userDTO = UserDTO.builder()
                 .email("sanchez@gmail.com")
                 .firstName("Sanchez")
                 .lastName("Santiago")
                 .password("123")
                 .build();

        user = User.builder()
                .email(userDTO.getEmail())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .password(userDTO.getPassword())
                .build();
    }

    @Test
    public void UserController_CreateUser_ReturnCreated() throws Exception {
       given(userService.createUser(ArgumentMatchers.any(UserDTO.class))).willReturn(user);

        ResultActions response = mockMvc.perform(post("/api/user/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)));

        response.andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName",
                        CoreMatchers.is(userDTO.getFirstName())))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName",
                        CoreMatchers.is(userDTO.getLastName())));
    }

    @Test
    public void UserController_GetUsers_ReturnUsers() throws Exception {
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


        when(userService.getAllUsers()).thenReturn(userList);

        ResultActions response = mockMvc.perform(get("/api/user/get-all")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(userList.size()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].email").value(userList.get(1).getEmail()));
    }


    @Test
    public void UserController_GetUserByID_ReturnUser() throws Exception {
        int userID = 1;


        when(userService.getUserByID(userID)).thenReturn(user);

        ResultActions response = mockMvc.perform(get("/api/user/1")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value(user.getFirstName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value(user.getLastName()));
    }

    @Test
    public void UserController_UpdateUser_ReturnUpdatedUser() throws Exception {
        int userID = 1;

        when(userService.updateUser(userID, userDTO)).thenReturn(user);

        ResultActions response = mockMvc.perform(put("/api/user/update/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)));

        response.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value(user.getFirstName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value(user.getLastName()));
    }

}
