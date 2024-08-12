package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.model.Order;

import java.util.List;

public interface OrderService {

    Order createUserOrder(OrderDTO orderDTO);

    List<Order> getUserOrders(int id);

    void deleteOrder(int orderID, int userID);
}
