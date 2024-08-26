package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.service.PlacedOrderService;
import org.springframework.data.repository.query.Param;
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

    public PlacedOrderController(PlacedOrderService placedOrderService) {
        this.placedOrderService = placedOrderService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getPlacedOrders() {
        List<PlacedOrder> placedOrders = placedOrderService.getPlacedOrders();
        return new ResponseEntity<>(placedOrders, HttpStatus.OK);
    }

    @GetMapping("/get-placed-orders/{id}")
    public ResponseEntity<?> getUserPlacedOrders(@PathVariable int id) {
        List<PlacedOrder> placedOrders = placedOrderService.getUserPlacedOrders(id);

        return new ResponseEntity<>(placedOrders, HttpStatus.OK);
    }

}
