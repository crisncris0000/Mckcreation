package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("SELECT order FROM Order order WHERE order.user.id = :id")
    List<Order> getUserOrders(@Param("id") int id);

    @Query("DELETE FROM Order order WHERE order.user.id = :orderID AND order.id = :id")
    void deleteOrder(@Param("userID") int userID, @Param("orderID") int orderID);
}
