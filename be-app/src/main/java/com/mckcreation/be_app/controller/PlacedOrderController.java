package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.service.PlacedOrderService;
import com.mckcreation.be_app.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/get-placed-orders/{id}")
    public ResponseEntity<?> getUserPlacedOrders(@PathVariable int id) {
        List<PlacedOrder> placedOrders = placedOrderService.getUserPlacedOrders(id);

        return new ResponseEntity<>(placedOrders, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPlacedOrder(@RequestBody PlacedOrderDTO placedOrderDTO) {

        Shipping shipping = shippingService.saveOrUpdateUserShipping(placedOrderDTO.getShippingDTO());

        placedOrderDTO.setShipping(shipping);

        PlacedOrder placedOrder = placedOrderService.createPlacedOrder(placedOrderDTO);

        return new ResponseEntity<>(placedOrder,HttpStatus.CREATED);
    }

}
