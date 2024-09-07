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
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PlacedOrderServiceTests {

    @Mock
    PlacedOrderRepository placedOrderRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    PlacedOrderServiceImpl placedOrderService;

    User user;

    Shipping shipping;

    PlacedOrder placedOrder;

    PlacedOrderDTO placedOrderDTO;

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
    }

    @Test
    public void PlacedOrderService_CreatePlacedOrder_ReturnPlacedOrder() {

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
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        when(userRepository.findById(1)).thenReturn(Optional.ofNullable(user));
        when(placedOrderRepository.save(Mockito.any(PlacedOrder.class))).thenReturn(placedOrder);

        placedOrder = placedOrderService.createPlacedOrder(placedOrderDTO);

        Assertions.assertThat(placedOrder).isNotNull();
        Assertions.assertThat(placedOrder.getTotal()).isEqualTo(placedOrderDTO.getTotal());
    }

    @Test
    public void PlacedOrderService_GetPlacedOrder_ReturnPlacedOrder() {

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
                .total(159.5f)
                .status("Completed")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        when(placedOrderRepository.findAll()).thenReturn(List.of(placedOrder, placedOrder2));


        List<PlacedOrder> placedOrders = placedOrderService.getPlacedOrders();

        Assertions.assertThat(placedOrders).isNotNull();
        Assertions.assertThat(placedOrders.size()).isEqualTo(2);

    }

    @Test
    public void PlacedOrderService_GetUserPlacedOrder_ReturnUserPlacedOrder() {
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
                .total(159.5f)
                .status("Completed")
                .user(user)
                .shipping(shipping)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        when(placedOrderRepository.getUserPlacedOrders(1)).thenReturn(List.of(placedOrder, placedOrder2));


        List<PlacedOrder> placedOrders = placedOrderService.getUserPlacedOrders(1);

        Assertions.assertThat(placedOrders).isNotNull();
        Assertions.assertThat(placedOrders.size()).isEqualTo(2);
    }
}
