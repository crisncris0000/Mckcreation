package com.mckcreation.be_app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserShippingDTO {

    String firstName;

    String lastName;

    String address;

    String city;

    String state;

    int zipCode;
}
