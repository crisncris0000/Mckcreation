package com.mckcreation.be_app.dto.responses;
import com.mckcreation.be_app.model.PlacedOrder;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PlacedOrdersAndCountDTO {

    List<PlacedOrder> placedOrderList;

    int count;
}
