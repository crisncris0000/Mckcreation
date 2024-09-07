package com.mckcreation.be_app.controller;


import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.security.service.JwtService;
import com.mckcreation.be_app.service.PlacedOrderService;
import com.mckcreation.be_app.service.ShippingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(controllers = PlacedOrderController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class PlacedOrderControllerTests {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    PlacedOrderService placedOrderService;

    @MockBean
    ShippingService shippingService;

    @MockBean
    JwtService jwtService;

    PlacedOrderDTO placedOrderDTO;

    PlacedOrder placedOrder;

    Shipping shipping;

    User user;

    Date date;
    Timestamp timestamp;

    @BeforeEach
    public void init() {

        date = new Date();
        timestamp = new Timestamp(date.getTime());

        user = User.builder()
                .email("Christopherrivera384@gmail.com")
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
                .zipCode(11111)
                .user(user)
                .build();

        placedOrderDTO = PlacedOrderDTO.builder()
                .details("order details")
                .total(159.5f)
                .status("Shipping")
                .userID(1)
                .shipping(shipping)
                .build();
    }

    @Test
    public void PlacedOrderController_GetPlacedOrders_ReturnPlacedOrders() throws Exception {
        placedOrder = PlacedOrder.builder()
                .orderDetails("Details")
                .total(159.5f)
                .status("Shipping")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        PlacedOrder placedOrder2 = PlacedOrder.builder()
                .orderDetails("More details")
                .total(189.5f)
                .status("Completed")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        given(placedOrderService.getPlacedOrders()).willReturn(List.of(placedOrder, placedOrder2));

        mockMvc.perform(get("/api/placed-order/get-all"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()").value(2));
    }


}
