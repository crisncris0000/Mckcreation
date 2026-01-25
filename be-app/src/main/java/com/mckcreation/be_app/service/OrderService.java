package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.dto.responses.OrderAndCountDTO;
import com.mckcreation.be_app.model.Order;

import java.util.List;

public interface OrderService {

    Order createUserOrder(OrderDTO orderDTO);

    List<Order> getAllUserOrders(long id);

    OrderAndCountDTO getUserOrders(long id, int page, int size);

    void deleteOrder(long orderID, long userID);
}
