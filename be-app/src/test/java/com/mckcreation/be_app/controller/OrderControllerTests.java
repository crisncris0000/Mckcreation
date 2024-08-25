package com.mckcreation.be_app.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.model.Order;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.CategoryRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.OrderService;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.sql.Timestamp;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = OrderController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class OrderControllerTests {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    OrderService orderService;

    @Mock
    UserRepository userRepository;

    @Mock
    CategoryRepository categoryRepository;

    @Autowired
    ObjectMapper objectMapper;

    Order order;
    OrderDTO orderDTO;

    Category category;
    User user;

    @BeforeEach
    public void init() {
        byte[] byteArray = Base64.getDecoder().decode("SGVsbG8sIFdvcmxkIQ==");

        category = Category.builder()
                .name("Clothing")
                .imageData(byteArray)
                .mimeType("image/png")
                .build();

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        user = User.builder()
                .email("Christopherrivera384@gmail.com")
                .firstName("Christopher")
                .lastName("Rivera")
                .password("123")
                .isAdmin(false)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();
    }

    @Test
    public void OrderController_CreateOrder_ReturnStatusCreated() throws Exception {

        orderDTO = OrderDTO.builder()
                .customize("customize")
                .price(30.0f)
                .categoryID(1)
                .userID(1)
                .build();

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        order = Order.builder()
                .customize(orderDTO.getCustomize())
                .price(orderDTO.getPrice())
                .category(category)
                .user(user)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        given(orderService.createUserOrder(ArgumentMatchers.any(OrderDTO.class))).willReturn(order);

        ResultActions response = mockMvc.perform(post("/api/order/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(orderDTO)));

        response.andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.customize",
                        CoreMatchers.is(orderDTO.getCustomize())))
                .andExpect(MockMvcResultMatchers.jsonPath("$.price",
                        CoreMatchers.is(30.0)));
    }
}
