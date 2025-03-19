package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import jakarta.persistence.EntityNotFoundException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class ShippingRepositoryTests {

    User user;
    User savedUser;
    Shipping shipping;

    ShippingRepository shippingRepository;

    UserRepository userRepository;

    @Autowired
    public ShippingRepositoryTests(ShippingRepository shippingRepository, UserRepository userRepository) {
        this.shippingRepository = shippingRepository;
        this.userRepository = userRepository;
    }

    @BeforeEach
    public void init() {
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

        savedUser = userRepository.save(user);
    }

    @Test
    public void ShippingRepository_FindUserShipping_ReturnUserShipping() {

        shipping = Shipping.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(11111)
                .user(user)
                .build();

        shippingRepository.save(shipping);


        Optional<Shipping> optionalShipping = shippingRepository.getUserShipping((int) savedUser.getId());

        Shipping savedShipping = optionalShipping.orElseThrow(() ->
                new EntityNotFoundException("Not found"));

        Assertions.assertThat(savedShipping).isNotNull();
        Assertions.assertThat(savedShipping.getAddress()).isEqualTo(shipping.getAddress());
    }
}
