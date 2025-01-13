package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.ItemDTO;
import com.mckcreation.be_app.model.Item;
import com.mckcreation.be_app.repository.ItemRepository;
import com.mckcreation.be_app.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item createItem(ItemDTO itemDTO) {

        Item item = Item.builder()
                .imageData(itemDTO.getImageData())
                .title(itemDTO.getTitle())
                .mimeType(itemDTO.getMimeType())
                .price(itemDTO.getPrice())
                .build();

        return itemRepository.save(item);
    }

    @Override
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @Override
    public void deleteItem(int id) throws Exception {
        Optional<Item> optionalItem = itemRepository.findById(id);

        Item item = optionalItem.orElseThrow(() ->
                new Exception("Item not found"));

        itemRepository.delete(item);
    }
}
