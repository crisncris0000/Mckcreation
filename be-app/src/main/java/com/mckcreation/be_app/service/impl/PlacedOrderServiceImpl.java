package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.OrderRepository;
import com.mckcreation.be_app.repository.PlacedOrderRepository;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.PlacedOrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class PlacedOrderServiceImpl implements PlacedOrderService {

    PlacedOrderRepository placedOrderRepository;
    OrderRepository orderRepository;
    ShippingRepository shippingRepository;
    UserRepository userRepository;

    @Autowired
    public PlacedOrderServiceImpl(PlacedOrderRepository placedOrderRepository, ShippingRepository shippingRepository,
                                  UserRepository userRepository, OrderRepository orderRepository) {
       this.placedOrderRepository = placedOrderRepository;
       this.shippingRepository = shippingRepository;
       this.userRepository = userRepository;
       this.orderRepository = orderRepository;
    }

    public PlacedOrder createPlacedOrder(PlacedOrderDTO placedOrderDTO, boolean useDefaultAddress) {

        User user = userRepository.findById(placedOrderDTO.getUserID())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Shipping shipping = useDefaultAddress
                ? shippingRepository.getUserShipping(placedOrderDTO.getUserID())
                .orElseThrow(() -> new EntityNotFoundException("Shipping address not found"))
                : shippingRepository.save(Shipping.builder()
                .address(placedOrderDTO.getShippingDTO().getAddress())
                .city(placedOrderDTO.getShippingDTO().getCity())
                .state(placedOrderDTO.getShippingDTO().getState())
                .zipCode(placedOrderDTO.getShippingDTO().getZipCode())
                .build());

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        PlacedOrder placedOrder = PlacedOrder.builder()
                .orderDetails(placedOrderDTO.getDetails())
                .total(placedOrderDTO.getTotal())
                .status(placedOrderDTO.getStatus())
                .shipping(shipping)
                .user(user)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        PlacedOrder savedPlacedOrder = placedOrderRepository.save(placedOrder);

        orderRepository.deleteUserOrders(user.getId());

        return savedPlacedOrder;
    }


    @Override
    public List<PlacedOrder> getPlacedOrders() {
        return placedOrderRepository.findAll();
    }

    @Override
    public List<PlacedOrder> getUserPlacedOrders(int id) {
        return placedOrderRepository.getUserPlacedOrders(id);
    }
}
