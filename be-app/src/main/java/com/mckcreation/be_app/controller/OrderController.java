package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.responses.OrderAndCountDTO;
import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.model.Order;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.service.OrderService;
import com.mckcreation.be_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    UserService userService;
    OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {

       Order order = orderService.createUserOrder(orderDTO);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/get-orders")
    public ResponseEntity<?> getUserOrders(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "false") boolean retrieveAll
    ) {
        String email = userDetails.getUsername();
        User user = userService.getUserByEmail(email);

        if (retrieveAll) {
            return ResponseEntity.ok(orderService.getAllUserOrders(user.getId()));
        }

        return new ResponseEntity<>(orderService.getUserOrders(user.getId(), page, size), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{orderID}")
    public ResponseEntity<?> deleteUserOrder(@PathVariable int orderID,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();

        User user = userService.getUserByEmail(email);

        orderService.deleteOrder(orderID, user.getId());
        return new ResponseEntity<>("Deleted order", HttpStatus.OK);
    }

}
