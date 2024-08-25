package com.mckcreation.be_app.service;

import com.mckcreation.be_app.model.PlacedOrder;

import java.util.List;

public interface PlacedOrderService {

    List<PlacedOrder> getPlacedOrders();

    List<PlacedOrder> getUserPlacedOrders(int id);


}
