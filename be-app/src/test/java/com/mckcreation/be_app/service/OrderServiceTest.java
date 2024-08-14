package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.model.Order;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.CategoryRepository;
import com.mckcreation.be_app.repository.OrderRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.impl.OrderServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    OrderRepository orderRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    CategoryRepository categoryRepository;

    @InjectMocks
    OrderServiceImpl orderService;

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
    public void OrderService_CreateOrder_ReturnCreatedOrder() {

        String customize = "Shirt with text saying I love you";


        orderDTO = OrderDTO.builder()
                .customize(customize)
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


        when(orderRepository.save(Mockito.any(Order.class))).thenReturn(order);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(1)).thenReturn(Optional.of(category));

        Order savedOrder = orderService.createUserOrder(orderDTO);

        Assertions.assertThat(savedOrder).isNotNull();
        Assertions.assertThat(savedOrder.getCustomize()).isEqualTo(customize);
    }

    @Test
    public void OrderService_GetUserOrders_ReturnUserOrders() {

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        order = Order.builder()
                .customize("I hate this shirt for real")
                .price(12)
                .category(category)
                .user(user)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        Order order2 = Order.builder()
                .customize("I love this amazing shirt")
                .price(12)
                .category(category)
                .user(user)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        List<Order> orderList = List.of(order, order2);


        when(orderRepository.getUserOrders(1)).thenReturn(orderList);

        List<Order> orders = orderService.getUserOrders(1);

        Assertions.assertThat(orders).isNotNull();
        Assertions.assertThat(orders.size()).isEqualTo(2);
    }


}
