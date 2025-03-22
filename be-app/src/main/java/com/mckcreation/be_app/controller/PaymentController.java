package com.mckcreation.be_app.controller;
import com.mckcreation.be_app.dto.PaymentIntentDTO;
import com.mckcreation.be_app.service.PlacedOrderService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    PlacedOrderService placedOrderService;

    @Autowired
    public PaymentController(PlacedOrderService placedOrderService) {
        this.placedOrderService = placedOrderService;
    }

    @PostMapping("/create-payment")
    public ResponseEntity<?> createPayment(@RequestBody PaymentIntentDTO paymentIntentDTO) throws StripeException {

        PaymentIntentCreateParams.Shipping shipping = PaymentIntentCreateParams.Shipping.builder()
                .setName(paymentIntentDTO.getFirstName() + " " + paymentIntentDTO.getLastName())  // Full name
                .setAddress(PaymentIntentCreateParams.Shipping.Address.builder()
                        .setLine1(paymentIntentDTO.getShipping().getAddress())  // Address line 1
                        .setCity(paymentIntentDTO.getShipping().getCity())  // City
                        .setPostalCode(String.valueOf(paymentIntentDTO.getShipping().getZipCode()))  // Postal code
                        .setCountry("USA")
                        .build())
                .build();

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(paymentIntentDTO.getTotal())
                .setCurrency("usd")
                .setShipping(shipping)
                .setPaymentMethod(paymentIntentDTO.getPaymentMethodID())
                .setReceiptEmail(paymentIntentDTO.getEmail())
                .setConfirm(true)
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true) // Enable automatic payment methods
                                .setAllowRedirects(PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.NEVER) // ✅ Disable redirects
                                .build()
                )
                .build();

        PaymentIntent.create(params);

        return new ResponseEntity<>(HttpStatus.OK);
    }




}
