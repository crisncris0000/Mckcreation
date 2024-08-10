package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Integer> {
}
