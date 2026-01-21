package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Order;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("SELECT o FROM Order o WHERE o.user.id = :userID")
    List<Order> findUserOrders(@Param("userID") long userID);

    @Query("SELECT o FROM Order o WHERE o.user.id = :userID ORDER BY o.createdAt DESC")
    List<Order> findAmountOfUserOrders(@Param("userID") long userID, Pageable pageable);

    @Query("SELECT COUNT(*) FROM Order o WHERE o.user.id = :userID")
    int findNumberOfUserOrders(@Param("userID") long userID);

    @Transactional
    @Modifying
    @Query("DELETE FROM Order o WHERE o.id = :orderID AND o.user.id = :userID")
    void deleteOrder(@Param("orderID") int orderID, @Param("userID") int userID);

    @Transactional
    @Modifying
    @Query("DELETE FROM Order o WHERE o.itemTitle = :itemTitle")
    void deleteOrderByTitle(@Param("itemTitle") String orderTitle);

    @Transactional
    @Modifying
    @Query("DELETE FROM Order o WHERE o.user.id = :userID")
    void deleteUserOrders(@Param("userID") long userID);
}
