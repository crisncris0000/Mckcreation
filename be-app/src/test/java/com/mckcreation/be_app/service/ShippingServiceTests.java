package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.impl.ShippingServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ShippingServiceTests {

    @Mock
    ShippingRepository shippingRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    ShippingServiceImpl shippingService;

    User user;

    Shipping shipping;

    ShippingDTO shippingDTO;

    @BeforeEach
    public void init() {
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
    public void ShippingService_GetUserShipping_ReturnUserShipping() {

        shipping = Shipping.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(11111)
                .user(user)
                .build();

        when(shippingRepository.findUserShipping(1)).thenReturn(Optional.ofNullable(shipping));

        Shipping returnedShipping = shippingService.getUserShipping(1);

        Assertions.assertThat(returnedShipping).isNotNull();
        Assertions.assertThat(returnedShipping.getAddress()).isEqualTo(shipping.getAddress());
    }

    @Test
    public void ShippingService_SaveOrUpdateShipping_ReturnShipping() {

        shipping = Shipping.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(11111)
                .user(user)
                .build();

        when(shippingRepository.save(Mockito.any(Shipping.class))).thenReturn(shipping);
        when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));

        shippingDTO = ShippingDTO.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(11111)
                .userID(1)
                .build();

        Shipping savedShipping = shippingService.saveOrUpdateUserShipping(shippingDTO);

        Assertions.assertThat(savedShipping).isNotNull();
    }
}
