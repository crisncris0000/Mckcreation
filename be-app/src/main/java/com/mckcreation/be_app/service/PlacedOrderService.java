package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.model.PlacedOrder;

import java.util.List;

public interface PlacedOrderService {

    List<PlacedOrder> getPlacedOrders();

    List<PlacedOrder> getAllUserPlacedOrders(int id);

    List<PlacedOrder> getAmountOfUserPlacedOrders(long id, int page, int size);

    PlacedOrder createPlacedOrder(PlacedOrderDTO placedOrderDTO, boolean useDefaultAddress);
}
