package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.ItemDTO;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.model.Item;
import com.mckcreation.be_app.repository.CategoryRepository;
import com.mckcreation.be_app.repository.ItemRepository;
import com.mckcreation.be_app.service.ItemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    ItemRepository itemRepository;

    CategoryRepository categoryRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository, CategoryRepository categoryRepository) {
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Item createItem(ItemDTO itemDTO) {

        byte[] imageData = null;

        try {
            imageData = itemDTO.getImageData().getBytes();
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        Optional<Category> optionalCategory = categoryRepository.findCategoryByName(itemDTO.getSelectedCategory());

        Category category = optionalCategory.orElseThrow(() ->
                new EntityNotFoundException("Category not found"));

        Item item = Item.builder()
                .imageData(imageData)
                .title(itemDTO.getTitle())
                .mimeType(itemDTO.getMimeType())
                .category(category)
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
