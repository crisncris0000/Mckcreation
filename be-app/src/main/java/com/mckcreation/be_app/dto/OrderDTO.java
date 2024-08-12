package com.mckcreation.be_app.dto;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderDTO {

    String customize;

    float price;

    int categoryID;

    int userID;
}
