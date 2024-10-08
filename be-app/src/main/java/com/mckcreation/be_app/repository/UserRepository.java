package com.mckcreation.be_app.repository;
import com.mckcreation.be_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT user FROM User user WHERE user.email = :email")
    Optional<User> findUserByEmail(@Param("email") String email);
}
