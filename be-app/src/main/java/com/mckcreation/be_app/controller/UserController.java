package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.service.UserService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/new")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {

        if(userService.userExists(userDTO.getEmail())) {
            return new ResponseEntity<>("User already exists",HttpStatus.NOT_ACCEPTABLE);
        }

        userService.createUser(userDTO);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserByID(@PathVariable int id) {

        User user = userService.getUserByID(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable int id, @RequestBody UserDTO userDTO) {

        userService.updateUser(id, userDTO);

        return new ResponseEntity<>("Updated User", HttpStatus.OK);
    }

    @PutMapping("/update-password/{id}")
    public ResponseEntity<String> updateUserPassword(@PathVariable int id, @RequestBody UserDTO userDTO) {

        try{
            userService.updateUserPassword(id, userDTO);
        } catch (Exception e) {
            return new ResponseEntity<>("Old password does not match", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>("Updated User", HttpStatus.OK);
    }


}
