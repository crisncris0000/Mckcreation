package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.CategoryDTO;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/category")
public class CategoryController {

    CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getCategories() {
        List<Category> categories = categoryService.getCategories();

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable int id, @RequestBody CategoryDTO categoryDTO) {

        Category category = categoryService.updateCategory(id, categoryDTO);

        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMapping(@PathVariable int id) {

        categoryService.deleteCategory(id);

        return new ResponseEntity<>("Deleted category", HttpStatus.OK);
    }

}
