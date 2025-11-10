package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.ItemDTO;
import com.mckcreation.be_app.model.Item;

import java.io.IOException;
import java.util.List;

public interface ItemService {

    Item createItem(ItemDTO itemDTO) throws Exception;

    List<Item> getItems();

    Item updateItem(int id, ItemDTO itemDTO) throws IOException;

    void deleteItem(int id) throws Exception;

}
