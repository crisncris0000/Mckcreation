package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.PlacedOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacedOrdersRepository extends JpaRepository<PlacedOrders, Integer> {
}
