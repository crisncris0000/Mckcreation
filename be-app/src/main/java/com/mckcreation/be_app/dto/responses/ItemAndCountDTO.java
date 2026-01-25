package com.mckcreation.be_app.dto.responses;

import com.mckcreation.be_app.model.Item;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ItemAndCountDTO {
    List<Item> itemList;

    int count;
}
