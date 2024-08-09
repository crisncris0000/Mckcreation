package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.CategoryDTO;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.repository.CategoryRepository;
import com.mckcreation.be_app.service.CategoryService;
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

    @Override
    public Category updateCategory(int id, CategoryDTO categoryDTO) {

        Optional<Category> optionalCategory = categoryRepository.findById(id);

        Category category = optionalCategory.orElseThrow(() ->
                new EntityNotFoundException("Category not found"));

        category.setName(categoryDTO.getName());
        category.setImageData(categoryDTO.getImageData());
        category.setMimeType(categoryDTO.getMimeType());

        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(int id) {

        Optional<Category> optionalCategory = categoryRepository.findById(id);

        Category category = optionalCategory.orElseThrow(() ->
                new EntityNotFoundException("Category not found"));

        categoryRepository.delete(category);
    }


}
