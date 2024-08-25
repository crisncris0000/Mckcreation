package com.mckcreation.be_app.service;

import com.mckcreation.be_app.model.PlacedOrders;

import java.util.List;

public interface PlacedOrdersService {

    List<PlacedOrders> getPlacedOrders();

    List<PlacedOrders> getUserPlacedOrders(int id);


}
