package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Order;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("SELECT order FROM Order order WHERE order.user.id = :userID")
    List<Order> findUserOrders(@Param("userID") int userID);

    @Transactional
    @Modifying
    @Query("DELETE FROM Order order WHERE order.id = :orderID AND order.user.id = :userID")
    void deleteOrder(@Param("orderID") int orderID, @Param("userID") int userID);

    @Transactional
    @Modifying
    @Query("DELETE FROM Order order WHERE order.itemTitle = :itemTitle")
    void deleteOrderByTitle(@Param("itemTitle") String orderTitle);

    @Transactional
    @Modifying
    @Query("DELETE FROM Order order WHERE order.user.id = :userID")
    void deleteUserOrders(@Param("userID") long userID);
}
