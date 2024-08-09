package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.CategoryDTO;
import com.mckcreation.be_app.model.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getCategories();

    Category updateCategory(int id, CategoryDTO categoryDTO);

    void deleteCategory(int id);
}
