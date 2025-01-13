package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.ItemDTO;
import com.mckcreation.be_app.model.Item;

import java.util.List;

public interface ItemService {

    Item createItem(ItemDTO itemDTO);

    List<Item> getItems();

    void deleteItem(int id) throws Exception;

}
