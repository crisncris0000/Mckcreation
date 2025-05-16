package com.mckcreation.be_app.controller;
import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.service.ShippingService;
import com.mckcreation.be_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipping")
public class ShippingController {

    ShippingService shippingService;
    UserService userService;

    @Autowired
    public ShippingController(ShippingService shippingService, UserService userService) {
        this.shippingService = shippingService;
        this.userService = userService;
    }

    @GetMapping("/get-user-shipping")
    public ResponseEntity<?> getUserShipping(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();

        User user = userService.getUserByEmail(email);

        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        Shipping shipping = shippingService.getUserShipping((int) user.getId());

        return new ResponseEntity<>(shipping, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> saveOrUpdateShipping(@RequestBody ShippingDTO shippingDTO) {

        Shipping shipping = shippingService.saveOrUpdateUserShipping(shippingDTO);

        return new ResponseEntity<>(shipping, HttpStatus.OK);
    }

}
