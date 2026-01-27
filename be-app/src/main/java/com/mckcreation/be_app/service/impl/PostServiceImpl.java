package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.PostDTO;
import com.mckcreation.be_app.dto.responses.PostAndCountDTO;
import com.mckcreation.be_app.model.Post;
import com.mckcreation.be_app.repository.PostRepository;
import com.mckcreation.be_app.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public Post createPost(PostDTO postDTO) {
        byte[] imageData = null;

        Date date = new Date();

        Timestamp timestamp = new Timestamp(date.getTime());

        try {
            imageData = postDTO.getImageData().getBytes();
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        Post post = Post.builder()
                .imageData(imageData)
                .mimeType(postDTO.getMimeType())
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public PostAndCountDTO getPosts(int page, int count) {
        return PostAndCountDTO.builder()
                .postList(postRepository.findAmountOfPosts(PageRequest.of(page, count)))
                .count(postRepository.countAllPost())
                .build();
    }


    @Override
    public void deletePost(int id) {
        Optional<Post> optionalPost = postRepository.findById(id);

        Post post = optionalPost.orElseThrow(() ->
                new EntityNotFoundException("Entity not found"));

        postRepository.delete(post);
    }
}
