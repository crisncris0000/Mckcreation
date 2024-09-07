package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class PlacedOrderRepositoryTests {

    PlacedOrderRepository placedOrderRepository;
    UserRepository userRepository;
    ShippingRepository shippingRepository;

    PlacedOrder placedOrder;

    User user;
    User savedUser;

    Shipping shipping;

    @Autowired
    public PlacedOrderRepositoryTests(PlacedOrderRepository placedOrderRepository,
                                      UserRepository userRepository, ShippingRepository shippingRepository) {
        this.placedOrderRepository = placedOrderRepository;
        this.userRepository = userRepository;
        this.shippingRepository = shippingRepository;
    }


    @BeforeEach
    public void init() {

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

        shipping = Shipping.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(11111)
                .user(user)
                .build();

        savedUser = userRepository.save(user);
        shippingRepository.save(shipping);
    }

    @Test
    public void PlacedOrderRepository_GetUserPlacedOrders_ReturnUserPlacedOrders() {

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        placedOrder = PlacedOrder.builder()
                .orderDetails("order details")
                .total(159.5f)
                .status("Shipping")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        PlacedOrder placedOrder2 = PlacedOrder.builder()
                .orderDetails("More details")
                .total(124.5f)
                .status("Delivered")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        placedOrderRepository.saveAll(List.of(placedOrder, placedOrder2));


        List<PlacedOrder> placedOrders = placedOrderRepository.getUserPlacedOrders((int) savedUser.getId());

        Assertions.assertThat(placedOrders).isNotNull();
        Assertions.assertThat(placedOrders.size()).isEqualTo(2);
    }

}
