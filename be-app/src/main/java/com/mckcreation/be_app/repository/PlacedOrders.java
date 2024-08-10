package com.mckcreation.be_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacedOrders extends JpaRepository<PlacedOrders, Integer> {
}
