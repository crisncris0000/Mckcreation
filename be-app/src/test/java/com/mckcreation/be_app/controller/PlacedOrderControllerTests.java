package com.mckcreation.be_app.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.security.service.JwtService;
import com.mckcreation.be_app.service.PlacedOrderService;
import com.mckcreation.be_app.service.ShippingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(controllers = PlacedOrderController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class PlacedOrderControllerTests {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockBean
    PlacedOrderService placedOrderService;

    @MockBean
    JwtService jwtService;

    @MockBean
    ShippingService shippingService;

    List<PlacedOrder> placedOrders;

    User user;

    Shipping shipping;



    @BeforeEach
    public void init() {

        placedOrders = new ArrayList<>();

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


        shipping = Shipping.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(12345)
                .user(user)
                .build();

        placedOrders.add(PlacedOrder.builder()
                .id(1L)
                .orderDetails("2x T-Shirts and 1x Jeans")
                .total(49.99F)
                .status("Processing")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build());

        placedOrders.add(PlacedOrder.builder()
                .id(2L)
                .orderDetails("1x Laptop")
                .total(899.99F)
                .status("Shipped")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build());

        placedOrders.add(PlacedOrder.builder()
                .id(3L)
                .orderDetails("1x Coffee Maker, 1x Toaster")
                .total(129.50F)
                .status("Delivered")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build());
    }

    @Test
    public void PlacedOrderController_GetPlacedOrders_ReturnPlacedOrders() throws Exception {
        when(placedOrderService.getPlacedOrders()).thenReturn(placedOrders);

        ResultActions response = mockMvc.perform(get("/api/placed-order/get-all")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(placedOrders.size()));
    }

    @Test
    public void PlacedOrderController_GetUserOrders_ReturnUserOrders() throws Exception {
        when(placedOrderService.getUserPlacedOrders(1)).thenReturn(placedOrders);

        ResultActions response = mockMvc.perform(get("/api/placed-order/get-user-orders/1")
                .contentType(MediaType.APPLICATION_JSON));

        response.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(placedOrders.size()));
    }
}
