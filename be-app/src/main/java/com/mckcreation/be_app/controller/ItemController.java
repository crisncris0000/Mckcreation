package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.ItemDTO;
import com.mckcreation.be_app.model.Item;
import com.mckcreation.be_app.service.ItemService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createItem(@ModelAttribute ItemDTO itemDTO) throws Exception {
        Item item = itemService.createItem(itemDTO);

        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getItems() {
        List<Item> itemList = itemService.getItems();

        return new ResponseEntity<>(itemList, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateItem(@PathVariable int id, @ModelAttribute ItemDTO itemDTO) throws IOException {

        Item item = itemService.updateItem(id, itemDTO);

        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable int id) throws Exception {
        itemService.deleteItem(id);

        return new ResponseEntity<>("Item deleted", HttpStatus.OK);
    }
}
