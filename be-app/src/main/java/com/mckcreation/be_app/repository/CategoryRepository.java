package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT category FROM Category category WHERE category.name = :name")
    Optional<Category> findCategoryByName(@Param("name") String name);
}
