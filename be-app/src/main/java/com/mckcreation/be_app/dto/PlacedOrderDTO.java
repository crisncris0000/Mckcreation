package com.mckcreation.be_app.dto;

import com.mckcreation.be_app.model.Shipping;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PlacedOrderDTO {

    String details;

    float total;

    String status;

    int userID;

    ShippingDTO shippingDTO;

    Shipping shipping;
}
