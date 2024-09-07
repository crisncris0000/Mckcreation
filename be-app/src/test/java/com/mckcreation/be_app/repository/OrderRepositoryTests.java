package com.mckcreation.be_app.repository;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.model.Order;
import com.mckcreation.be_app.model.User;
import jakarta.persistence.EntityManager;
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
import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class OrderRepositoryTests {

    OrderRepository orderRepository;
    UserRepository userRepository;
    CategoryRepository categoryRepository;

    Order order;
    Category category;
    User user;

    EntityManager entityManager;



    @Autowired
    public OrderRepositoryTests(OrderRepository orderRepository, UserRepository userRepository,
                               CategoryRepository categoryRepository, EntityManager entityManager) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.entityManager = entityManager;
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
                .role("USER")
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        userRepository.save(user);
        categoryRepository.save(category);
    }


    @Test
    public void OrderRepository_SaveOrder_ShouldReturnSavedOrder() {
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
        Assertions.assertThat(savedOrder.getUser().getEmail()).isEqualTo(user.getEmail());
        Assertions.assertThat(savedOrder.getCategory().getName()).isEqualTo(category.getName());
    }

    @Test
    public void OrderRepository_GetUserOrders_ShouldReturnUserOrders() {
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

        Order order1 = Order.builder()
                .customize("Shirt with text saying I hate you")
                .price(30.0f)
                .category(category)
                .user(user)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        orderRepository.save(order);
        orderRepository.save(order1);

        // ensure the changes are reflected within the database
        entityManager.flush();
        entityManager.clear();


        List<Order> orders = orderRepository.findUserOrders((int) user.getId());

        Assertions.assertThat(orders.size()).isEqualTo(2);
    }

    @Test
    public void OrderRepository_DeleteUserOrder_ShouldReturnEmptyOrder() {
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

        orderRepository.deleteOrder((int) order.getId(), (int) order.getUser().getId());

        // ensure the changes are reflected within the database
        entityManager.flush();
        entityManager.clear();

        Optional<Order> optionalOrder = orderRepository.findById((int) savedOrder.getId());

        Assertions.assertThat(optionalOrder.isPresent()).isFalse();
    }
}
