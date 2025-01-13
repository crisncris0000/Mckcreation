package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.ItemDTO;
import com.mckcreation.be_app.model.Item;
import com.mckcreation.be_app.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createItem(@RequestBody ItemDTO itemDTO) {
        Item item = itemService.createItem(itemDTO);

        return new ResponseEntity<>(item, HttpStatus.OK);
    }

}
