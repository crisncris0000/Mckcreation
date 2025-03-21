package com.mckcreation.be_app.controller;
import com.mckcreation.be_app.dto.PaymentIntentDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @PostMapping("/create-payment")
    public ResponseEntity<?> createPayment(@RequestBody PaymentIntentDTO paymentIntentDTO) throws StripeException {
        // Create the shipping details with the address and name
        PaymentIntentCreateParams.Shipping shipping = PaymentIntentCreateParams.Shipping.builder()
                .setName(paymentIntentDTO.getFirstName() + " " + paymentIntentDTO.getLastName())  // Full name
                .setAddress(PaymentIntentCreateParams.Shipping.Address.builder()
                        .setLine1(paymentIntentDTO.getShippingDTO().getAddress())  // Address line 1
                        .setCity(paymentIntentDTO.getShippingDTO().getCity())  // City
                        .setPostalCode(String.valueOf(paymentIntentDTO.getShippingDTO().getZipCode()))  // Postal code
                        .setCountry("USA")
                        .build())
                .build();

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(paymentIntentDTO.getTotal())
                .setCurrency("usd")
                .setShipping(shipping)
                .setPaymentMethod(paymentIntentDTO.getPaymentID())
                .setReceiptEmail(paymentIntentDTO.getEmail())
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        return new ResponseEntity<>(paymentIntent, HttpStatus.OK);
    }




}
