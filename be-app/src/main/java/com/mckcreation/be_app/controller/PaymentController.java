package com.mckcreation.be_app.controller;
import com.mckcreation.be_app.model.Shipping;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @PostMapping("/create-payment")
    public ResponseEntity<?> createPayment() throws StripeException {
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(2000L)
                        .setCurrency("usd")
                        .setShipping(Shipping.builder()
                                .build())
                        .setPaymentMethod("pm_card_visa")
                        .build();

        PaymentIntent.create(params);

        return new ResponseEntity<>(HttpStatus.OK);
    }



}
