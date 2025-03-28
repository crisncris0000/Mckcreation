package com.mckcreation.be_app.dto;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class OrderDTO {

    String itemTitle;

    String customization;

    float price;

    long categoryID;

    long userID;
}
