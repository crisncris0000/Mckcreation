package com.mckcreation.be_app.dto;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderDTO {

    String customization;

    float price;

    long categoryID;

    long userID;
}
