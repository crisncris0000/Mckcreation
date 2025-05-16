package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.service.PlacedOrderService;
import com.mckcreation.be_app.service.ShippingService;
import com.mckcreation.be_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/placed-order")
public class PlacedOrderController {

    PlacedOrderService placedOrderService;
    ShippingService shippingService;
    UserService userService;

    @Autowired
    public PlacedOrderController(PlacedOrderService placedOrderService, ShippingService shippingService,
                                 UserService userService) {
        this.placedOrderService = placedOrderService;
        this.shippingService = shippingService;
        this.userService = userService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getPlacedOrders() {
        List<PlacedOrder> placedOrders = placedOrderService.getPlacedOrders();
        return new ResponseEntity<>(placedOrders, HttpStatus.OK);
    }

    @GetMapping("/get-user-orders")
    public ResponseEntity<?> getUserPlacedOrders(@AuthenticationPrincipal UserDetails userDetails) {

        String email = userDetails.getUsername();

        User user = userService.getUserByEmail(email);

        List<PlacedOrder> placedOrders = placedOrderService.getUserPlacedOrders((int) user.getId());

        return new ResponseEntity<>(placedOrders, HttpStatus.OK);
    }
}
