package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.CategoryDTO;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.repository.CategoryRepository;
import com.mckcreation.be_app.service.CategoryService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();

        categoryDTO.setName(categoryDTO.getName());

        boolean exists = categoryExists(categoryDTO.getName());

        if(exists) {
            throw new EntityExistsException("Category already exists");
        }

        category.setName(categoryDTO.getName());

        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(int id, CategoryDTO categoryDTO) {

        Optional<Category> optionalCategory = categoryRepository.findById(id);

        Category category = optionalCategory.orElseThrow(() ->
                new EntityNotFoundException("Category not found"));

        category.setName(categoryDTO.getName());

        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(int id) {

        Optional<Category> optionalCategory = categoryRepository.findById(id);

        Category category = optionalCategory.orElseThrow(() ->
                new EntityNotFoundException("Category not found"));

        categoryRepository.delete(category);
    }

    private boolean categoryExists(String name) {
        Optional<Category> optionalCategory = categoryRepository.findCategoryByName(name);

        return optionalCategory.isPresent();
    }


}
