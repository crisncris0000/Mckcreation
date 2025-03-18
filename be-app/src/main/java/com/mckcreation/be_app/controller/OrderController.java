package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.model.Order;
import com.mckcreation.be_app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {

       Order order = orderService.createUserOrder(orderDTO);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/get-orders/{id}")
    public ResponseEntity<?> getUserOrders(@PathVariable int id) {

        List<Order> orderList = orderService.getUserOrders(id);

        return new ResponseEntity<>(orderList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{orderID}/{userID}")
    public ResponseEntity<?> deleteUserOrder(@PathVariable int orderID, @PathVariable int userID) {
        orderService.deleteOrder(orderID, userID);

        return new ResponseEntity<>("Deleted order", HttpStatus.OK);
    }

}
