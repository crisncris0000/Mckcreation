package com.mckcreation.be_app.dto;

import jakarta.persistence.Column;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ShippingDTO {

    String address;

    String state;

    String city;

    int zipCode;

    int userID;
}
