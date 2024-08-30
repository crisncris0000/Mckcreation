package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.PlacedOrderRepository;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.PlacedOrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class PlacedOrderImpl implements PlacedOrderService {

    PlacedOrderRepository placedOrderRepository;
    ShippingRepository shippingRepository;
    UserRepository userRepository;

    @Autowired
    public PlacedOrderImpl(PlacedOrderRepository placedOrderRepository,
                           ShippingRepository shippingRepository, UserRepository userRepository) {
       this.placedOrderRepository = placedOrderRepository;
       this.shippingRepository = shippingRepository;
       this.userRepository = userRepository;
    }

    public PlacedOrder createPlacedOrder(PlacedOrderDTO placedOrderDTO) {

        Optional<User> optionalUser = userRepository.findById(placedOrderDTO.getUserID());

        User user = optionalUser.orElseThrow(() ->
                new EntityNotFoundException("User not found"));

        PlacedOrder placedOrder = PlacedOrder.builder()
                .orderDetails(placedOrderDTO.getDetails())
                .total(placedOrderDTO.getTotal())
                .status(placedOrderDTO.getStatus())
                .user(user)
                .shipping(placedOrderDTO.getShipping())
                .build();


        return placedOrderRepository.save(placedOrder);
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
