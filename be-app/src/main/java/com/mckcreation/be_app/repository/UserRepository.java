package com.mckcreation.be_app.repository;
import com.mckcreation.be_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT user FROM User user WHERE user.email = :email")
    Optional<User> findUserByEmail(@Param("email") String email);

    @Query("SELECT user FROM User user ORDER BY user.createdAt DESC")
    List<User> getRecentUsers(Pageable pageable);
}
