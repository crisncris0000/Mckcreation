package com.mckcreation.be_app.controller;
import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipping")
public class ShippingController {

    ShippingService shippingService;

    @Autowired
    public ShippingController(ShippingService shippingService) {
        this.shippingService = shippingService;
    }

    @GetMapping("/get-user-shipping/{id}}")
    public ResponseEntity<?> getUserShipping(@PathVariable("id") int id) {
        Shipping shipping = shippingService.getUserShipping(id);

        return new ResponseEntity<>(shipping, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUserShipping(@PathVariable("id") int id, @RequestBody ShippingDTO shippingDTO) {

        Shipping shipping = shippingService.updateUserShipping(id, shippingDTO);

        return new ResponseEntity<>(shipping, HttpStatus.OK);
    }

}
