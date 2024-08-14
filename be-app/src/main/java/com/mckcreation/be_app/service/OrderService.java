package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.model.Order;

import java.util.List;

public interface OrderService {

    Order createUserOrder(OrderDTO orderDTO);

    List<Order> getUserOrders(long id);

    void deleteOrder(long orderID, long userID);
}
