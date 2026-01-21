package com.mckcreation.be_app.dto;

import com.mckcreation.be_app.model.Order;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderAndCountDTO {

    List<Order> orderList;

    int count;

}
