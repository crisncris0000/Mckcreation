package com.mckcreation.be_app.repository;

import com.mckcreation.be_app.model.Item;
import com.mckcreation.be_app.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("SELECT COUNT(*) FROM Post post")
    int countAllPost();

    @Query("SELECT post FROM Post post ORDER BY post.createdAt DESC")
    List<Post> findAmountOfPosts(Pageable pageable);

}
