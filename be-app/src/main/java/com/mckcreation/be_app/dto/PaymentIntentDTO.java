package com.mckcreation.be_app.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PaymentIntentDTO {

    String paymentMethodID;

    long total;

    ShippingDTO shipping;

    OrderDTO[] orders;

    int userID;

    String email;

    String firstName;

    String lastName;

    boolean useDefaultAddress;
}
