package com.mckcreation.be_app.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PaymentIntentDTO {

    String paymentID;

    long total;

    ShippingDTO shippingDTO;

    String email;

    String firstName;

    String lastName;
}
