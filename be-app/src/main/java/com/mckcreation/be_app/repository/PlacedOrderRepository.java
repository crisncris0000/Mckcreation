package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.PlacedOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacedOrderRepository extends JpaRepository<PlacedOrder, Integer> {

    @Query("SELECT placedOrder FROM PlacedOrder placedOrder WHERE placedOrder.user.id = :id")
    List<PlacedOrder> getUserPlacedOrders(@Param("id") int id);
}
