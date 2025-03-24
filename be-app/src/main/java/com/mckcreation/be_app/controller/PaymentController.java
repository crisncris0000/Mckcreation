package com.mckcreation.be_app.controller;
import com.mckcreation.be_app.dto.PaymentIntentDTO;
import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.service.PlacedOrderService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
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
                .setName(paymentIntentDTO.getFirstName() + " " + paymentIntentDTO.getLastName())
                .setAddress(PaymentIntentCreateParams.Shipping.Address.builder()
                        .setLine1(paymentIntentDTO.getShipping().getAddress())
                        .setCity(paymentIntentDTO.getShipping().getCity())
                        .setPostalCode(String.valueOf(paymentIntentDTO.getShipping().getZipCode()))
                        .setCountry("USA")
                        .build())
                .build();

        PaymentIntentCreateParams.Builder paramsBuilder = PaymentIntentCreateParams.builder()
                .setAmount(paymentIntentDTO.getTotal())
                .setCurrency("usd")
                .setShipping(shipping)
                .setPaymentMethod(paymentIntentDTO.getPaymentMethodID())
                .setReceiptEmail(paymentIntentDTO.getEmail())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .setAllowRedirects(PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.NEVER)
                                .build()
                );

        if (paymentIntentDTO.getPaymentMethodID() != null) {
            paramsBuilder.setConfirm(true);
        }

        ShippingDTO shippingDTO = ShippingDTO.builder()
                .address(paymentIntentDTO.getShipping().getAddress())
                .state(paymentIntentDTO.getShipping().getState())
                .city(paymentIntentDTO.getShipping().getCity())
                .zipCode(paymentIntentDTO.getShipping().getZipCode())
                .build();

        PlacedOrderDTO placedOrderDTO = PlacedOrderDTO.builder()
                .userID(paymentIntentDTO.getUserID())  // ✅ Ensure userID is included
                .details(Arrays.toString(paymentIntentDTO.getOrders()))
                .total(paymentIntentDTO.getTotal())
                .status("Order placed")
                .shippingDTO(shippingDTO)
                .build();

        placedOrderService.createPlacedOrder(placedOrderDTO, paymentIntentDTO.isUseDefaultAddress());

        PaymentIntent.create(paramsBuilder.build());

        return ResponseEntity.ok().build();
    }




}
