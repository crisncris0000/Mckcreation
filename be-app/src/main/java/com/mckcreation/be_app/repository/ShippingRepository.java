package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShippingRepository extends JpaRepository<Shipping, Integer> {

    @Query("SELECT shipping FROM Shipping shipping WHERE shipping.user.id = :userID")
    Optional<Shipping> getUserShipping(@Param("userID") long userID);
}
