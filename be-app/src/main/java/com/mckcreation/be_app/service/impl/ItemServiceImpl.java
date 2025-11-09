package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.ItemDTO;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.model.Item;
import com.mckcreation.be_app.repository.CategoryRepository;
import com.mckcreation.be_app.repository.ItemRepository;
import com.mckcreation.be_app.repository.OrderRepository;
import com.mckcreation.be_app.service.ItemService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    ItemRepository itemRepository;

    CategoryRepository categoryRepository;

    OrderRepository orderRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository, CategoryRepository categoryRepository,
                           OrderRepository orderRepository) {
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
        this.orderRepository = orderRepository;
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

        Date date = new Date();

        Timestamp timestamp = new Timestamp(date.getTime());

        Item item = Item.builder()
                .imageData(imageData)
                .title(itemDTO.getTitle())
                .mimeType(itemDTO.getMimeType())
                .category(category)
                .price(itemDTO.getPrice())
                .sold(0)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        return itemRepository.save(item);
    }

    @Override
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item updateItem(int id, ItemDTO itemDTO) {

        Optional<Item> optionalItem = itemRepository.findById(id);

        Item item = optionalItem.orElseThrow(() -> new EntityNotFoundException("Item not found"));

        byte[] imageData = null;

        if(itemDTO.getImageData() != null) {
            try {
                imageData = itemDTO.getImageData().getBytes();
            } catch (Exception exception) {
                exception.printStackTrace();
            }
        }

        Optional<Category> optionalCategory =
                categoryRepository.findCategoryByName(itemDTO.getSelectedCategory());


        Category category = optionalCategory.orElseGet(() -> {
            Category newCategory = Category.builder()
                    .name(itemDTO.getSelectedCategory())
                    .build();

            return categoryRepository.save(newCategory);
        });

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        item.setTitle(itemDTO.getTitle());
        item.setMimeType(itemDTO.getMimeType());
        item.setPrice(itemDTO.getPrice());
        if(imageData != null) {
            item.setImageData(imageData);
        }
        item.setCategory(category);
        item.setUpdatedAt(timestamp);

        return itemRepository.save(item);
    }

    @Override
    public void deleteItem(int id) throws Exception {
        Optional<Item> optionalItem = itemRepository.findById(id);

        Item item = optionalItem.orElseThrow(() ->
                new Exception("Item not found"));

        orderRepository.deleteOrderByTitle(item.getTitle());

        itemRepository.delete(item);
    }
}
