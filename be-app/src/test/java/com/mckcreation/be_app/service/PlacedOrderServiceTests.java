package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.PlacedOrderRepository;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.impl.PlacedOrderServiceImpl;
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
public class PlacedOrderServiceTests {

    @Mock
    PlacedOrderRepository placedOrderRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    ShippingRepository shippingRepository;

    @InjectMocks
    PlacedOrderServiceImpl placedOrderService;

    User user;

    Shipping shipping;

    PlacedOrder placedOrder;

    PlacedOrderDTO placedOrderDTO;

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

        shipping = Shipping.builder()
                .address("123 elmo street")
                .city("Brooklyn")
                .state("NY")
                .zipCode(11111)
                .user(user)
                .build();
    }

    @Test
    public void PlacedOrderService_CreatePlacedOrder_ReturnPlacedOrder() {
        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        placedOrderDTO = PlacedOrderDTO.builder()
                .details("order details")
                .total(159.5f)
                .status("Shipping")
                .userID(1)
                .shipping(shipping)
                .build();

        placedOrder = PlacedOrder.builder()
                .orderDetails(placedOrderDTO.getDetails())
                .total(159.5f)
                .status("Shipping")
                .user(user)
                .shipping(shipping)
                .build();

        when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        when(placedOrderRepository.save(Mockito.any(PlacedOrder.class))).thenReturn(placedOrder);

        placedOrder = placedOrderService.createPlacedOrder(placedOrderDTO);

        Assertions.assertThat(placedOrder).isNotNull();
    }
}
