package com.mckcreation.be_app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.security.service.JwtService;
import com.mckcreation.be_app.service.ShippingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;
import java.util.Date;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;


@WebMvcTest(controllers = ShippingController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class ShippingControllerTests {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    ShippingService shippingService;

    Shipping shipping;

    ShippingDTO shippingDTO;

    User user;

    @BeforeEach
    public void init() {

        shippingDTO = ShippingDTO.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(12345)
                .userID(1)
                .build();

        shipping = Shipping.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(12345)
                .user(user)
                .build();

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        user = User.builder()
                .email("christopherrivera384@gmail.com")
                .firstName("Christopher")
                .lastName("Rivera")
                .password("123")
                .role("USER")
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();
    }

    @Test
    public void ShippingController_GetUserShipping_ReturnUserShipping() throws Exception {
        when(shippingService.getUserShipping(1)).thenReturn(shipping);


        ResultActions response = mockMvc.perform(get("/api/shipping/get-user-shipping/1")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.zipCode").value(shipping.getZipCode()));
    }

    @Test
    public void ShippingController_SaveOrUpdateShipping_ReturnShipping() throws Exception {
        given(shippingService.saveOrUpdateUserShipping(ArgumentMatchers.any(ShippingDTO.class)))
                .willReturn(shipping);



        ResultActions response = mockMvc.perform(post("/api/shipping/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(shippingDTO)));

        System.out.println(response.andReturn().getResponse().getContentAsString());

        response.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.zipCode").value(shippingDTO.getZipCode()));
    }
}
