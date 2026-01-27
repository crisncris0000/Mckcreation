package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.PostDTO;
import com.mckcreation.be_app.dto.responses.PostAndCountDTO;
import com.mckcreation.be_app.model.Post;

import java.util.List;

public interface PostService {

    Post createPost(PostDTO postDTO);

    List<Post> getAllPosts();

    PostAndCountDTO getPosts(int page, int count);

    void deletePost(int id);
}
