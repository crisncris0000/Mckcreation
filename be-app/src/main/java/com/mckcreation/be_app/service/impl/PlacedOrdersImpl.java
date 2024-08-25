package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.model.PlacedOrders;
import com.mckcreation.be_app.service.PlacedOrdersService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacedOrdersImpl implements PlacedOrdersService {

    @Override
    public List<PlacedOrders> getPlacedOrders() {
        return List.of();
    }

    @Override
    public List<PlacedOrders> getUserPlacedOrders(int id) {
        return List.of();
    }
}
