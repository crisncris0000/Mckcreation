package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Item;
import com.mckcreation.be_app.model.PlacedOrder;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacedOrderRepository extends JpaRepository<PlacedOrder, Integer> {

    @Query("SELECT placedOrder FROM PlacedOrder placedOrder WHERE placedOrder.user.id = :userID")
    List<PlacedOrder> findAllUserPlacedOrders(@Param("userID") int userID);

    @Query("SELECT COUNT(*) FROM PlacedOrder placedOrder")
    int countPlacedOrders();

    @Query("SELECT placedOrder FROM PlacedOrder placedOrder WHERE placedOrder.user.id = :userID " +
            "ORDER BY placedOrder.createdAt DESC")
    List<PlacedOrder> findUserPlacedOrders(@Param("userID") long userID, Pageable pageable);
}
