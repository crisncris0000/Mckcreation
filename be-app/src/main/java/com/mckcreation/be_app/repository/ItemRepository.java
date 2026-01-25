package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Item;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Query("SELECT COUNT(item) FROM Item item")
    int countAllItems();

    @Query("SELECT COUNT(item) FROM Item item WHERE item.category.id = :categoryID")
    long countItemsByCategory(@Param("categoryID") int categoryID);

    @Query("SELECT item FROM Item item WHERE item.category.id = :categoryID ORDER BY item.createdAt DESC")
    List<Item> findAmountOfItemsByCategory(@Param("categoryID") int categoryID, Pageable pageable);

    @Query("SELECT item FROM Item item ORDER BY item.createdAt DESC")
    List<Item> findAmountOfItems(Pageable pageable);

    boolean existsByTitle(String title);
}
