package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.OrderRepository;
import com.mckcreation.be_app.repository.PlacedOrderRepository;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.impl.PlacedOrderServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.swing.text.html.Option;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)

public class PlacedOrderServiceTests {

    @Mock
    PlacedOrderRepository placedOrderRepository;

    @Mock
    OrderRepository orderRepository;

    @Mock
    ShippingRepository shippingRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    PlacedOrderServiceImpl placedOrderService;

    User user;

    Shipping shipping;

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
                .address("123 Elmo Street")
                .state("NY")
                .city("Bronx")
                .zipCode(10461)
                .user(user)
                .build();

    }

    @Test
    public void PlacedOrderService_CreatePlacedOrder_ReturnSavedPlacedOrder() {

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        ShippingDTO shippingDTO = ShippingDTO.builder()
                .address("123 Elmo Street")
                .state("NY")
                .city("Bronx")
                .zipCode(10461)
                .userID(1)
                .build();

        PlacedOrderDTO placedOrderDTO = PlacedOrderDTO.builder()
                .details("This is a test")
                .total(11.99F)
                .status("Shipping")
                .shippingDTO(shippingDTO)
                .userID(1)
                .build();

        PlacedOrder placedOrder = PlacedOrder.builder()
                .orderDetails("This is a test")
                .total(11.99F)
                .status("Shipping")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        when(userRepository.findById(Mockito.anyInt())).thenReturn(Optional.ofNullable(user));
        when(shippingRepository.save(Mockito.any(Shipping.class))).thenReturn(shipping);
        when(placedOrderRepository.save(Mockito.any(PlacedOrder.class))).thenReturn(placedOrder);
        Mockito.doNothing().when(orderRepository).deleteUserOrders(Mockito.anyLong());

        PlacedOrder savedPlacedOrder = placedOrderService.createPlacedOrder(placedOrderDTO, false);

        Assertions.assertNotNull(placedOrder);

        Assertions.assertEquals(savedPlacedOrder.getOrderDetails(), placedOrderDTO.getDetails());
    }

}
