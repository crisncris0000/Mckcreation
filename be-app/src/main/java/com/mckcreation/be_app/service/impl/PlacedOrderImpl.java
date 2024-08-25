package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.repository.PlacedOrderRepository;
import com.mckcreation.be_app.service.PlacedOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacedOrderImpl implements PlacedOrderService {

    PlacedOrderRepository placedOrderRepository;

    @Autowired
    public PlacedOrderImpl(PlacedOrderRepository placedOrderRepository) {
       this.placedOrderRepository = placedOrderRepository;
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
