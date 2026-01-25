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

    @GetMapping("/get-posts")
    public ResponseEntity<?> getPosts( @RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "10") int size,
                                       @RequestParam(defaultValue = "false") boolean retrieveAll) {
        if (retrieveAll) {
            return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
        }
        return new ResponseEntity<>(postService.getAmountOfPosts(page, size), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") int id) {

        postService.deletePost(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
