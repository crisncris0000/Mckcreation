package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.service.PlacedOrderService;
import com.mckcreation.be_app.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    public PlacedOrderController(PlacedOrderService placedOrderService, ShippingService shippingService) {
        this.placedOrderService = placedOrderService;
        this.shippingService = shippingService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getPlacedOrders() {
        List<PlacedOrder> placedOrders = placedOrderService.getPlacedOrders();
        return new ResponseEntity<>(placedOrders, HttpStatus.OK);
    }

    @GetMapping("/get-user-orders/{id}")
    public ResponseEntity<?> getUserPlacedOrders(@PathVariable int id) {
        List<PlacedOrder> placedOrders = placedOrderService.getUserPlacedOrders(id);

        return new ResponseEntity<>(placedOrders, HttpStatus.OK);
    }
}
