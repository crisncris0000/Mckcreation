package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.PostDTO;
import com.mckcreation.be_app.model.Post;
import com.mckcreation.be_app.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/post")
public class PostController {

    PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@ModelAttribute PostDTO postDTO) {
        Post post = postService.createPost(postDTO);

        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getPosts() {
        List<Post> postList = postService.getPosts();

        return new ResponseEntity<>(postList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") int id) {

        postService.deletePost(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
