package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.model.Order;
import com.mckcreation.be_app.model.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.Timestamp;
import java.util.Base64;
import java.util.Date;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class OrderRepositoryTest {

    OrderRepository orderRepository;
    UserRepository userRepository;
    CategoryRepository categoryRepository;

    OrderDTO orderDTO;
    Order order;
    Category category;
    User user;



    @Autowired
    public OrderRepositoryTest(OrderRepository orderRepository, UserRepository userRepository,
                               CategoryRepository categoryRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

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

        userRepository.save(user);
        categoryRepository.save(category);
    }


    @Test
    public void OrderRepository_GetUserOrders_ShouldReturnSavedOrder() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        order = Order.builder()
                .customize("Shirt with text saying I love you")
                .price(30.0f)
                .category(category)
                .user(user)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        Order savedOrder = orderRepository.save(order);

        Assertions.assertThat(savedOrder).isNotNull();
    }
}
